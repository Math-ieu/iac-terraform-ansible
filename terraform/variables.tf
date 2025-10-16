variable "aws_region" {
  description = "La région AWS utilisée"
  default     = "eu-west-3" # Paris
}

variable "instance_type" {
  description = "Type d'instance EC2"
  default     = "t3.micro"
}

variable "key_name" {
  description = "Nom de la clé SSH AWS"
  default     = "my-key"
}

variable "db_password" {
  description = "Mot de passe pour la base de données RDS"
  type        = string
  sensitive   = true
}

variable "db_username" {
  description = "Nom d’utilisateur de la base de données"
  default     = "admin"
}
