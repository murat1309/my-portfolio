output "s3_bucket_id" {
  description = "The ID of the S3 bucket."
  value       = aws_s3_bucket.static_site_bucket.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "cloudfront_zone_id" {
  description = "The Route 53 Hosted Zone ID for CloudFront."
  value       = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}

output "site_url" {
  description = "The URL of the deployed website."
  value       = "https://${var.domain_name}"
} 