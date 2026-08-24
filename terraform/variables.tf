variable "instance_type" {
  default = "t2.micro"
}
variable "key_name" {
  default = "devops-node-key"
}

variable "ssh_allowed_cidr" {
  description = "CIDR block allowed to connect over SSH, for example 203.0.113.10/32"
  type        = string
}
