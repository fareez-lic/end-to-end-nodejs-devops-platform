# 🚀 End-to-End DevOps Node.js Application

A complete DevOps portfolio project demonstrating the full lifecycle of
a Node.js application:

-   Application development
-   Automated testing
-   Docker containerization
-   Jenkins CI/CD automation
-   Docker Hub image publishing
-   Kubernetes deployment
-   Nginx Ingress routing
-   Terraform Infrastructure as Code
-   AWS EC2 cloud deployment

------------------------------------------------------------------------

## 👨‍💻 Project Owner

**fareez-lic**

------------------------------------------------------------------------

# 🚀 Run Locally

```bash
npm install
npm start
```

The application starts at:

```text
http://localhost:3000/
```

Useful endpoints:

```text
/          # Application status
/health    # Health check
/about     # Project details
```


# 🏗️ Architecture

``` text
Developer
   |
   v
GitHub Repository
   |
   v
Jenkins CI/CD Pipeline
   |
   +-------------------+----------------------+
   |                   |                      |
   v                   v                      v
Run Tests        Build Docker Image      Terraform
                       |                      |
                       v                      v
                  Docker Hub          AWS Infrastructure
                                      (EC2 / Security Group)
                                             |
                                             v
                                     Pull Docker Image
                                             |
                                             v
                                     Docker Container
                                             |
                                             v
                                   Node.js Application

Docker Hub
   |
   v
Kubernetes Deployment
   |
   v
Nginx Ingress
   |
   v
Node.js Pods
   |
   v
Application Health Check

```

------------------------------------------------------------------------
# 🧪 Testing

Automated API tests are implemented with Jest and Supertest.

Run the test suite:

```bash
npm test
```
# 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| Node.js | Application runtime |
| Express.js | Web framework |
| Jest | Automated testing |
| Supertest | API testing |
| Docker | Containerization |
| Jenkins | CI/CD automation |
| Docker Hub | Container registry |
| Kubernetes | Container orchestration |
| Nginx Ingress | Traffic routing |
| Terraform | Infrastructure as Code for provisioning AWS EC2 and security groups |
| AWS EC2 | Cloud deployment |

------------------------------------------------------------------------


# 📁 Project Structure

``` text
devops-node-app/
├── app.js
├── app.test.js
├── Dockerfile
├── Jenkinsfile
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── terraform/
│   ├── main.tf
│   ├── provider.tf
│   ├── variables.tf
│   └── outputs.tf
├── assets/
│   └── devops-architecture.png
└── README.md
```

------------------------------------------------------------------------

# 🌐 Application Endpoints

  Endpoint    Purpose
  ----------- -------------------------
  `/`         Application status
  `/health`   Health check endpoint
  `/about`    Application information

Example response:

``` json
{
  "message": "🚀 DevOps Node App is Live!",
  "version": "1.0.0",
  "author": "fareez-lic",
  "status": "running"
}
```

------------------------------------------------------------------------

# 🧪 Automated Testing

Testing is implemented using:

-   Jest
-   Supertest

Run tests:

``` bash
npm test
```

Tests validate:

-   Application root endpoint
-   Health endpoint
-   About endpoint

------------------------------------------------------------------------

# 🐳 Docker Containerization

Docker image:

``` text
kam810/devops-node-app:latest
```

Features:

-   Node.js 18 Alpine base image
-   Production dependency installation
-   Port 3000 exposure
-   Container health check

Build image:

``` bash
docker build -t kam810/devops-node-app:latest .
```

Run container:

``` bash
docker run -d \
-p 3000:3000 \
--name devops-node-app \
kam810/devops-node-app:latest
```

Verify:

``` bash
docker ps
```

Expected:

``` text
STATUS: Up (healthy)
```

------------------------------------------------------------------------

# ⚙️ Jenkins CI/CD Pipeline

The Jenkins pipeline automates the build and image publishing process.

Pipeline stages:

``` text
Developer Push
      |
      v
GitHub Repository
      |
      v
Jenkins Pipeline
      |
      +-- Checkout Source Code
      |
      +-- Install Dependencies
      |
      +-- Run Automated Tests
      |
      +-- Build Docker Image
      |
      +-- Push Image to Docker Hub
```

Published image:

``` text
kam810/devops-node-app:latest
```

------------------------------------------------------------------------

# ☸️ Kubernetes Deployment

Kubernetes resources:

-   Deployment
-   Service
-   Nginx Ingress

Deployment configuration:

-   Replicas: 2
-   Image: `kam810/devops-node-app:latest`
-   Container port: 3000

Validation commands:

``` bash
kubectl get pods
kubectl get service
kubectl get ingress
```

Verified results:

``` text
2/2 application pods running
Nginx Ingress routing successful
Application health endpoint responding
```

Ingress test:

``` bash
curl -H "Host: devops-node.local" http://192.168.49.2/health
```

Response:

``` json
{
  "status": "healthy"
}
```

------------------------------------------------------------------------

# 🏗️ Terraform AWS Deployment

Terraform provisions AWS infrastructure:

Resources created:

-   AWS EC2 instance
-   Security Group

Validation:

``` bash
terraform validate
terraform apply
```

AWS application health check:

``` bash
curl http://<AWS-IP>:3000/health
```

Example response:

``` json
{
  "status": "healthy"
}
```

------------------------------------------------------------------------

# 🔍 Troubleshooting Experience

This project demonstrated real DevOps troubleshooting:

``` text
Observe
   ↓
Investigate
   ↓
Find Root Cause
   ↓
Fix
   ↓
Rebuild
   ↓
Validate
   ↓
Document
```

Example:

Docker container initially reported unhealthy because the health check
required `curl` inside the container.

Resolution:

``` dockerfile
RUN apk add --no-cache curl
```

After rebuilding, the container reported:

``` text
healthy
```

------------------------------------------------------------------------

# ✅ Final Validation Summary

  Component                  Status
  -------------------------- --------
  Node.js Application        ✅
  Automated Tests            ✅
  Docker Container           ✅
  Docker Health Check        ✅
  Jenkins CI/CD              ✅
  Docker Hub Publishing      ✅
  Kubernetes Deployment      ✅
  Nginx Ingress              ✅
  Terraform Infrastructure   ✅
  AWS EC2 Deployment         ✅

------------------------------------------------------------------------

# 📌 DevOps Philosophy

This project was built using:

``` text
Build → Test → Troubleshoot → Fix → Validate → Document
```

The goal was not only to deploy an application, but to demonstrate
practical DevOps skills through automation, troubleshooting,
infrastructure management, and continuous improvement.
