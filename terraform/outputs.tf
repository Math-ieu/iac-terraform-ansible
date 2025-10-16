output "instance_public_ip" {
  description = "Adresse IP publique de l’instance EC2"
  value       = aws_instance.web_server.public_ip
}

output "db_endpoint" {
  description = "Endpoint de la base de données RDS"
  value       = aws_db_instance.db.endpoint
}
