terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # AWS Provider sürümünü kilitliyoruz.
    }
  }
}

# AWS provider'ını yapılandırıyoruz
provider "aws" {
  region = "us-east-1" # Projenizi dağıtmak istediğiniz AWS bölgesini buraya girin (örneğin, "eu-central-1" veya "us-east-1")
}

resource "aws_s3_bucket" "static_site_bucket" {
  bucket = var.bucket_name

  tags = {
    Project = var.project_tag
  }
}

# S3 Bucket'ı statik web sitesi olarak yapılandırıyoruz.
resource "aws_s3_bucket_website_configuration" "static_site_config" {
  bucket = aws_s3_bucket.static_site_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# Route 53 Hosted Zone'umuzu veri kaynağı olarak içe aktarıyoruz.
# Bu, manuel olarak kaydedilen domainimiz için otomatik olarak oluşturulan Hosted Zone'u kullanmamızı sağlar.
data "aws_route53_zone" "selected" {
  name         = var.domain_name
  private_zone = false # Bu bir public domain olduğu için false olarak ayarlıyoruz.
}

# AWS Certificate Manager (ACM) ile SSL/TLS sertifikası talebinde bulunuyoruz.
# Bu sertifika CloudFront için kullanılacak ve US-EAST-1 bölgesinde olmalıdır.
resource "aws_acm_certificate" "site_certificate" {
  domain_name       = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = [
    "*.${var.domain_name}", # Hem ana domain hem de subdomainler için sertifika istiyoruz.
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Project = var.project_tag
  }
}

# ACM sertifikasının doğrulanması için Route 53'te DNS kayıtları oluşturuyoruz.
resource "aws_route53_record" "site_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site_certificate.domain_validation_options :
    dvo.resource_record_name => dvo...
  }

  zone_id = data.aws_route53_zone.selected.zone_id
  name    = each.key
  type    = each.value[0].resource_record_type
  ttl     = 60
  records = [each.value[0].resource_record_value]

  lifecycle {
    create_before_destroy = true
    ignore_changes = [records]
  }
}

# ACM sertifikasının doğrulanmasını bekliyoruz.
resource "aws_acm_certificate_validation" "site_certificate_validation" {
  certificate_arn         = aws_acm_certificate.site_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.site_certificate_validation : record.fqdn]
}

# CloudFront dağıtımını oluşturuyoruz.
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.static_site_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.static_site_bucket.id
    # OAI yerine OAC kullanıyoruz
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for ${var.domain_name}"
  default_root_object = "index.html"

  aliases             = [var.domain_name]

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = aws_s3_bucket.static_site_bucket.id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Custom error responses
  custom_error_response {
    error_code         = 404
    response_page_path = "/404.html"
    response_code      = 404
    error_caching_min_ttl = 300
  }

  custom_error_response {
    error_code         = 403
    response_page_path = "/index.html" # Access Denied durumunda index.html'e yönlendir
    response_code      = 200
    error_caching_min_ttl = 300
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site_certificate_validation.certificate_arn # Doğrulanmış ACM sertifikasını kullanıyoruz.
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  tags = {
    Project = var.project_tag
  }
}

# CloudFront Origin Access Control (OAC) oluşturuyoruz
resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for ${var.domain_name} S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 Bucket Politikası (OAC ile güncellenmiş)
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.static_site_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalReadOnly",
        Effect    = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.static_site_bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      },
    ],
  })
}

# S3 Public Access Block ayarlarını tanımlıyoruz (public erişimi engelliyoruz çünkü OAC kullanıyoruz)
resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.static_site_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Route 53 A kaydı oluşturuyoruz, bu domainimizi CloudFront dağıtımına yönlendirecek.
resource "aws_route53_record" "site_domain_record" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
} 