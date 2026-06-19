provider "aws" { 
  region = var.region
}

# S3 buckets used by the frontend/backend media flows.
resource "aws_s3_bucket" "media" {
  for_each = toset(var.media_bucket_names)

  bucket        = each.value
  force_destroy = var.force_destroy_media_buckets

  tags = {
    Name    = each.value
    Project = "vegan-mundi"
  }
}

resource "aws_s3_bucket_versioning" "media" {
  for_each = aws_s3_bucket.media

  bucket = each.value.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "media" {
  for_each = aws_s3_bucket.media

  bucket = each.value.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "media_bucket_names" {
  value = [for bucket in aws_s3_bucket.media : bucket.bucket]
}

output "media_bucket_arns" {
  value = [for bucket in aws_s3_bucket.media : bucket.arn]
}
