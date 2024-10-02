variable "region" {
  description = "AWS region to which the resources will be deployed"
  type        = string
  default     = "us-east-2"
}

variable "DB_USER_NAME" {
  description = "The user name for the RDS database"
  type        = string
  sensitive   = false
}

variable "DB_PASSWORD" {
  description = "The password for the RDS database"
  type        = string
  sensitive   = true
}