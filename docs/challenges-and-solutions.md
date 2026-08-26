# Challenges, Root Causes and Solutions

This document records the practical difficulties encountered while building the End-to-End DevOps Node.js project. Each issue was investigated, corrected and validated rather than hidden from the project history.

## 1. Jenkins Pipeline Syntax Errors

### Problem

The initial Jenkins pipeline failed because the `Jenkinsfile` contained incorrect braces and pipeline syntax. Jenkins could not parse or execute all stages reliably.

### Investigation

The pipeline structure and commit history were reviewed. The failures occurred before the application build completed, indicating that the problem was in the pipeline definition rather than the Node.js application.

### Root cause

Some stages and closing braces were incorrectly positioned while the build, test, Docker image and Docker Hub push stages were being added.

### Solution

The `Jenkinsfile` structure was corrected and its stages were organized into a valid declarative pipeline:

- Checkout source code
- Install dependencies
- Run automated tests
- Build the Docker image
- Authenticate with Docker Hub securely
- Push the image to Docker Hub

### Result

Jenkins could parse the pipeline and execute the complete CI/CD workflow. Docker Hub credentials were handled through Jenkins credentials instead of being committed to Git.

## 2. Jest Test Process Did Not Exit

### Problem

The tests passed, but Jest warned that an asynchronous operation was still running. The test command initially required the `--forceExit` workaround.

### Investigation

The test file used Supertest to import the Express application. Importing `app.js` also executed `app.listen()`, which opened a real network server during the tests.

### Root cause

The application did not distinguish between being executed normally and being imported by the test suite.

### Solution

The server startup was protected with:

`if (require.main === module)`

The Express application remained exportable for Supertest, while `app.listen()` ran only when `app.js` was executed directly. The `--forceExit` option was then removed from the Jest command.

### Result

All API tests completed successfully and Jest exited normally without hiding an open-handle problem.

## 3. Docker Container Reported Unhealthy

### Problem

The application container started, but Docker reported an unhealthy container status.

### Investigation

The Docker health check called the application’s `/health` endpoint using `curl`. The Node Alpine base image did not include `curl`.

### Root cause

The health-check command depended on a program that was missing inside the container.

### Solution

`curl` was installed in the image using Alpine’s package manager, and the image was rebuilt.

### Result

Docker could execute the health check successfully, and the container changed to a healthy state.
## 4. Docker Build Context Was Extremely Large

### Problem

Docker initially sent approximately 843.6 MB of files into the image build context, making builds unnecessarily slow.

### Investigation

The project directory contained `node_modules`, Git history, screenshots, infrastructure files and a downloaded Minikube binary. These files were not required to run the Node.js application inside the container.

### Root cause

The `.dockerignore` file did not exclude enough local development and infrastructure artifacts.

### Solution

The `.dockerignore` file was expanded to exclude:

- `node_modules`
- `.git`
- Screenshots and documentation assets
- Terraform files
- Kubernetes files
- Local editor and operating-system files
- The downloaded Minikube binary

### Result

The Docker build context was reduced from approximately 843.6 MB to 207.4 kB, producing faster and cleaner builds.

## 5. Large Minikube Binary Was Accidentally Added

### Problem

The downloaded `minikube-linux-amd64` executable was added to the project repository.

### Investigation

Repository changes showed that this locally downloaded tool was being treated as project source code.

### Root cause

The binary was stored inside the repository directory and was not initially excluded by ignore rules.

### Solution

The binary was removed from Git tracking and added to `.gitignore` and `.dockerignore`.

### Result

The repository and Docker build context no longer depended on a large machine-specific executable. Installation remains a documented prerequisite instead of committed project content.

## 6. Kubernetes API Was Unavailable

### Problem

Kubernetes commands failed because they could not connect to the Kubernetes API server.

### Investigation

The Minikube status was checked and showed that the local Kubernetes cluster was stopped.

### Root cause

Kubernetes manifests were being validated against a Minikube cluster that was not running.

### Solution

Minikube was started, the NGINX Ingress addon was enabled, and the Kubernetes manifests were reapplied. Deployment rollout, pods, services and Ingress were then checked.

### Result

Two application replicas became available, and the `/health` endpoint returned HTTP 200 through the NGINX Ingress route.
## 7. Kubernetes Health and Traffic Validation

### Problem

A running container alone did not prove that Kubernetes could safely route production traffic to the application.

### Investigation

The deployment needed separate checks for container health, readiness to receive traffic and external routing through Ingress.

### Root cause

The first version of the Kubernetes deployment did not contain complete readiness and liveness validation.

### Solution

The deployment was enhanced with:

- A liveness probe using `/health`
- A readiness probe using `/ready`
- Multiple replicas
- A Kubernetes Service
- NGINX Ingress routing

The rollout, pod state, Service, Ingress and application endpoints were validated after deployment.

### Result

Kubernetes could restart unhealthy containers, avoid routing traffic to unready pods and expose the application through the configured Ingress route.

## 8. Terraform Allowed SSH From the Entire Internet

### Problem

The original EC2 security-group configuration allowed SSH access from `0.0.0.0/0`.

### Investigation

The Terraform security rules were reviewed before using the infrastructure configuration.

### Root cause

A broad CIDR had been used for convenience during initial development.

### Solution

The fixed CIDR was replaced with the configurable `ssh_allowed_cidr` variable. A safe example was added to `terraform.tfvars.example`, allowing users to restrict SSH to their own public IP address with a `/32` CIDR.

### Result

The infrastructure configuration follows least-privilege access more closely and no longer recommends globally open SSH.

## 9. Terraform Secrets and State Required Protection

### Problem

Terraform variable and state files can contain account-specific values, IP addresses and sensitive infrastructure information.

### Investigation

The repository ignore rules and Terraform directory were reviewed before publishing the project.

### Root cause

Without explicit exclusions, local `.tfvars`, state files and Terraform working directories could be accidentally committed.

### Solution

The `.gitignore` file was updated to exclude:

- Real `terraform.tfvars` files
- Terraform state files
- State backups
- `.terraform/`
- Generated plan files

A sanitized `terraform.tfvars.example` was committed to show the required configuration without exposing real values.

### Result

The repository remains reusable while local infrastructure details and state stay outside Git.
## 10. Terraform Configuration Needed Validation Without Creating Costs

### Problem

The Terraform code needed to be proven syntactically valid, but deploying AWS infrastructure only for documentation could create unnecessary charges.

### Investigation

Terraform’s non-deployment validation commands were used to separate configuration testing from resource creation.

### Solution

The following checks were performed:

- `terraform fmt -check`
- `terraform init`
- `terraform validate`

### Result

Terraform reported that the configuration was valid without requiring chargeable AWS resources to remain running. The README clearly distinguishes configuration validation from an actual AWS deployment.

## 11. Architecture Documentation Became Outdated

### Problem

As Jenkins, Docker Hub, Kubernetes, Ingress and Terraform were added, the original architecture illustration no longer represented the complete workflow.

### Investigation

The diagram was compared with the implemented files and CI/CD pipeline.

### Root cause

The project evolved faster than its original visual documentation.

### Solution

The architecture documentation and infographic were revised to show the current flow between the developer, GitHub, Jenkins, Docker Hub, Kubernetes, NGINX Ingress and Terraform-managed AWS infrastructure.

### Result

A reviewer can understand the system architecture and delivery pipeline without reading every source file first.

## 12. README Evidence and Markdown Formatting Required Cleanup

### Problem

The README accumulated repeated sections and validation screenshots during development. Some Markdown code fences were malformed, causing GitHub to display later content as code instead of formatted documentation.

### Investigation

The README headings, code-fence characters and rendered GitHub preview were reviewed.

### Root cause

Documentation was added incrementally, and some copied code fences contained single or mismatched backticks.

### Solution

Code fences were normalized, outdated evidence was replaced, and clean validation results were retained for:

- Jest tests
- Docker health
- Kubernetes deployment and Ingress
- Terraform validation

### Result

The documentation presents both implementation details and verifiable evidence in a readable portfolio format.

## Troubleshooting Method Used

The same process was followed throughout the project:

1. Observe the visible failure or unexpected result.
2. Inspect logs, status output, configuration and recent changes.
3. Identify the root cause instead of applying a temporary workaround.
4. Correct the smallest relevant component.
5. Rebuild, rerun or redeploy.
6. Validate the result with an appropriate command or health endpoint.
7. Commit and document the lesson.

## Key Lessons

- A passing test is incomplete if the process cannot exit cleanly.
- Container health checks must use tools that exist inside the image.
- Ignore rules improve security and build performance.
- Kubernetes readiness and liveness solve different problems.
- Infrastructure code should be validated before deployment.
- Public SSH access should be restricted to a trusted CIDR.
- CI/CD credentials belong in a credential manager, not source control.
- Troubleshooting history is valuable portfolio evidence when it is explained honestly.
