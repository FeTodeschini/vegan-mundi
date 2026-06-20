variable "region" {
  description = "AWS region to which the resources will be deployed"
  type        = string
  default     = "us-east-2"
}

variable "media_bucket_names" {
  description = "S3 bucket names used for media assets (thumbnails, gallery, videos)."
  type        = list(string)
  default     = ["vegan-mundi-thumbnails", "vegan-mundi-gallery", "vegan-mundi-videos"]
}

variable "force_destroy_media_buckets" {
  description = "When true, bucket objects are removed on destroy. Keep false for safety in shared environments."
  type        = bool
  default     = false
}