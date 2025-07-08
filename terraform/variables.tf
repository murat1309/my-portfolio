variable "bucket_name" {
  description = "The name of the S3 bucket for the Next.js static assets."
  type        = string
  default = "muratcangokyokus-portfolio"
}

variable "domain_name" {
  description = "The domain name for your website."
  type        = string
  default     = "muratcangokyokus.com"
}

variable "region" {
  description = "The AWS region to deploy resources."
  type        = string
  default     = "us-east-1"
}

variable "project_tag" {
  description = "Tag for identifying resources belonging to this project."
  type        = string
  default     = "NextjsPortfolio"
} 