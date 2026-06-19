# Vegan Mundi Hosting and Infrastructure (Current Model)

This document describes the current hosting model after moving frontend and Node backend off EC2.

## Initial Hosting Approach
- Both the front and back-end were hosted on EC2 instances that were manually configured (i.e. NGNIX, nodejs installation for learning purposes).
- Media storage (images/videos): AWS S3 buckets.
- Database: AWS RDS MySQL.

## Second Version's Hosting (Migratied from AWS for Costs and Simplicity Reasons)
- Frontend (React/Next.js): hosted on Vercel.
- Node.js backend (Express): hosted on Render.
- Media storage (images/videos): AWS S3 buckets (same as initial version).
- Database: shared AWS RDS MySQL, provisioned by the Java Terraform repo (`vegan-mundi-java`).
- Database: AWS RDS MySQL (same as initial version), provisioned by the Java Terraform repo (`vegan-mundi-java`).

## Third Version's Hosting: Back-end rewritting- Java Microservices on AWS ECS behind an ALB (Application Load Balancer)
- New Java microservices back-end hosted on ECS
- Database: shared AWS RDS MySQL, provisioned by the Java Terraform repo (`vegan-mundi-java`).
- It is possible to switch between the old (NodeJs) and new (Java/Microservise) back-end by simply updating the CNAME in GoDaddy to point to the proper API endpoint


## What Changed
Previously, this repo had Terraform resources for EC2-based app hosting.

Now:
- EC2 instance resources were removed from `terraform/vegan-mundi.tf`.
- Elastic IP resources were removed.
- EC2 security group resources were removed.
- EC2 IAM role/instance profile resources were removed.
- Terraform in this repo now manages S3 media buckets only.

## S3 Buckets Used by the App

The client/backend code references these buckets:
- `vegan-mundi-thumbnails`
- `vegan-mundi-gallery`
- `vegan-mundi-videos`

These are configured by `media_bucket_names` in `terraform/variables.tf` and `terraform/terraform.tfvars`.

## Terraform Scope in This Repo

`vegan-mundi/terraform` is now scoped to media buckets only.

### Managed resources
- `aws_s3_bucket` (one per media bucket)
- `aws_s3_bucket_versioning` (enabled)
- `aws_s3_bucket_public_access_block` (public access blocked)

### Not managed here
- EC2 app servers
- Load balancers
- RDS database

RDS ownership is in `vegan-mundi-java/terraform`.

## How To Apply

```bash
cd terraform
terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars"
```

## If Buckets Already Exist

If a bucket already exists in AWS and was not created by this Terraform state, import it before apply.

Example:

```bash
terraform import 'aws_s3_bucket.media["vegan-mundi-thumbnails"]' vegan-mundi-thumbnails
terraform import 'aws_s3_bucket.media["vegan-mundi-gallery"]' vegan-mundi-gallery
terraform import 'aws_s3_bucket.media["vegan-mundi-videos"]' vegan-mundi-videos
```

Then run `terraform plan` again.

## Runtime Credentials Reminder (Render)

The backend still generates S3 pre-signed URLs, so Render must have valid AWS credentials/permissions and region configured in environment variables or equivalent runtime IAM integration.

## EC2 Decommission Checklist

Use this checklist before removing any remaining EC2-era infrastructure in AWS.

### 1) Pre-checks (do not skip)

- Confirm frontend is serving from Vercel production URL.
- Confirm API DNS (`api.veganmundi.com`) points to Render target.
- Confirm Render backend health endpoint returns success.
- Confirm Render has DB env vars set to shared RDS values.
- Confirm Render has AWS credentials/permissions for S3 pre-signed URL generation.
- Confirm media reads for all three buckets work end-to-end:
	- `vegan-mundi-thumbnails`
	- `vegan-mundi-gallery`
	- `vegan-mundi-videos`

### 2) Backup and rollback data to capture

- Previous DNS record values and TTL.
- Previous backend endpoint URL.
- IDs of EC2-era resources (instance ID, EIP allocation ID, SG ID, IAM role/profile names).
- Last known good smoke test results.

### 3) Decommission execution

From this repo Terraform state:

```bash
cd terraform
terraform init
terraform plan -var-file="terraform.tfvars"
```

Review plan output and confirm only EC2-era resources are scheduled for destroy while S3 stays managed.

Then apply:

```bash
terraform apply -var-file="terraform.tfvars"
```

### 4) Post-decommission validation

- API health check through public DNS succeeds.
- Login, search, class image thumbnails, gallery images, and video playback all work.
- S3 pre-signed URL route (`/s3/:bucket/:key`) still responds correctly.
- No traffic is observed against old EC2 endpoint.

### 5) Rollback plan (if needed)

- Revert DNS to previous known-good target.
- Revert backend env vars if changed.
- Redeploy/restart Render service.
- If AWS resources were already destroyed, restore from Terraform history/state backup and apply a known-good revision.
