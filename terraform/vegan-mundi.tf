provider "aws" { 
  region = var.region
}

# data block for fetching AWS identity
data "aws_caller_identity" "current" {}

# -----------------------------------------
# Create a Security Group for the EC2
# -----------------------------------------
resource "aws_security_group" "application_server_sg" {
  name        = "application-server-test-sg"
  description = "Security group for application server"
  vpc_id      = "vpc-030909f7aab725185"

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Inbound rules
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["172.31.11.19/32"]
    description = "Private IP of the Docker/Jenkins EC2"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["47.200.202.126/32"]
    description = "Local machine"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = ["sg-0b02474584e553479"]
    description = "Docker/Jenkins EC2"
  }

  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -----------------------------------------
# Launch the test EC2 Instance based on the Vegan Mundi image
# -----------------------------------------
resource "aws_instance" "vegan_mundi_test" {
  ami                    = "ami-0baea0462949e9178"  # vegan-mundi-image
  instance_type          = "t2.micro"
  subnet_id              = "subnet-009ddf8e0b336273d" # second subnet to differentiate the TEST from the PROD environment
  iam_instance_profile    = aws_iam_instance_profile.rds_instance_profile.name  # Attach the new Instance profile

  # Attach the new test EC2 the security group created in step 1
  vpc_security_group_ids = [aws_security_group.application_server_sg.id]

  tags = {
    Name = "vegan-mundi-test"
  }
}

# -----------------------------------------
# Create Elastic IP and attach it to the EC2
# -----------------------------------------
resource "aws_eip" "vegan_mundi_test_eip" {
  vpc = true
}

# Associate the Elastic IP with the EC2 instance
resource "aws_eip_association" "vegan_mundi_test_association" {
  instance_id = aws_instance.vegan_mundi_test.id
  allocation_id = aws_eip.vegan_mundi_test_eip.id
}

# -----------------------------------------
# Create Security Group for RDS
# -----------------------------------------
resource "aws_security_group" "rds_test_sg" {
  name        = "rds-test-sg"
  description = "Security group for RDS"
  vpc_id      = "vpc-030909f7aab725185"  # Replace with your actual VPC ID

  # Inbound rules for MySQL
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["47.200.202.126/32"]  # Local machine IP
  }

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    security_groups = [aws_security_group.application_server_sg.id]
    description = "Allow MySQL access from the application server"
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -----------------------------------------
# Create RDS MySQL Database (based on a PROD snapshot)
# -----------------------------------------
resource "aws_db_instance" "vegan_mundi_test" {
  identifier         = "vegan-mundi-test"
  engine             = "mysql"
  instance_class     = "db.t3.micro"
  allocated_storage   = 20
  username           = var.DB_USER_NAME
  password           = var.DB_PASSWORD
  db_name            = "vegan-mundi"
  publicly_accessible = true
  vpc_security_group_ids = [aws_security_group.rds_test_sg.id]

  # Clone the database from an existing RDS instance
  snapshot_identifier = "arn:aws:rds:us-east-2:211125337663:snapshot:vegan-mundi-rds-prod-snapshot"
  
  # This line skips taking a final snapshot after the cloning
  skip_final_snapshot = true

  tags = {
    Name = "vegan-mundi-test"
  }
}

# -----------------------------------------
# Create a new IAM role for the EC2 to have access to the RDS and S3 bucket
# -----------------------------------------
resource "aws_iam_role" "rds_role" {
  name = "ec2-to-s3-and-rds-test"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Effect    = "Allow"
        Sid       = ""
      }
    ]
  })
}

# Create an IAM instance profile and associate it with the IAM role
# When you attach a role to an Instance Profile from the AWS console, you don't need to create the Instance Profile itself, as AWS 
# does that behind the scenes. You simply attach the role
resource "aws_iam_instance_profile" "rds_instance_profile" {
  name = aws_iam_role.rds_role.name
  role = aws_iam_role.rds_role.name
}

# Create a policy to allow RDS database access
resource "aws_iam_policy" "rds_policy" {
  name        = "vegan-mundi-rds-iam-connection-test"
  description = "Policy to allow EC2 connection to the new RDS instance and to the S3 bucket"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "rds-db:connect"
        Effect = "Allow"
        Resource = "arn:aws:rds-db:${var.region}:${data.aws_caller_identity.current.account_id}:dbuser:admin/vegan-mundi"
      }
    ]
  })
}

# Attach the policy vegan-mundi-rds-iam-connection-test to the IAM role (RDS access)
resource "aws_iam_role_policy_attachment" "attach_rds_policy" {
  role       = aws_iam_role.rds_role.name
  policy_arn = aws_iam_policy.rds_policy.arn
}

# Attach the policy AmazonS3ReadOnlyAccess to the IAM role
resource "aws_iam_role_policy_attachment" "attach_s3_policy" {
  role       = aws_iam_role.rds_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

# Optional: Output the instance ID
output "instance_id" {
  value = aws_instance.vegan_mundi_test.id
}

# Optional: Output the RDS endpoint
output "rds_endpoint" {
  value = aws_db_instance.vegan_mundi_test.endpoint
}
