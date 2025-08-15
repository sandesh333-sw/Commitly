# Commitly Deployment Guide

This document provides step-by-step instructions for deploying the Commitly application using Docker, Kubernetes, and Render.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Render Deployment](#render-deployment)
5. [CI/CD Setup](#cicd-setup)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

## Local Development

### Prerequisites

- Node.js (v18 or later)
- MongoDB (v4.4 or later)
- Docker and Docker Compose (for containerized development)

### Using Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/commitly.git
   cd commitly
   ```

2. Start the development environment:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Manual Setup

1. Start MongoDB:
   ```bash
   mongod --dbpath /path/to/data/directory
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Docker Deployment

### Building Docker Images

1. Build the backend image:
   ```bash
   cd backend
   docker build -t commitly-backend:latest .
   ```

2. Build the frontend image:
   ```bash
   cd frontend
   docker build -t commitly-frontend:latest .
   ```

### Running with Docker

1. Create a Docker network:
   ```bash
   docker network create commitly-network
   ```

2. Run MongoDB:
   ```bash
   docker run -d --name mongodb --network commitly-network \
     -e MONGO_INITDB_ROOT_USERNAME=root \
     -e MONGO_INITDB_ROOT_PASSWORD=example \
     -v mongodb_data:/data/db \
     mongo:latest
   ```

3. Run the backend:
   ```bash
   docker run -d --name commitly-backend --network commitly-network \
     -p 3000:3000 \
     -e MONGODB_URI=mongodb://root:example@mongodb:27017/commitly?authSource=admin \
     -e JWT_SECRET=your_jwt_secret \
     commitly-backend:latest
   ```

4. Run the frontend:
   ```bash
   docker run -d --name commitly-frontend --network commitly-network \
     -p 80:80 \
     commitly-frontend:latest
   ```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (e.g., minikube, GKE, EKS, AKS)
- kubectl configured to access your cluster
- Helm (optional, for package management)

### Deployment Steps

1. Create the namespace:
   ```bash
   kubectl apply -f kubernetes/namespace.yaml
   ```

2. Create secrets:
   ```bash
   kubectl apply -f kubernetes/mongodb-secret.yaml
   kubectl apply -f kubernetes/app-secret.yaml
   ```

3. Deploy MongoDB:
   ```bash
   kubectl apply -f kubernetes/mongodb-deployment.yaml
   ```

4. Deploy the backend:
   ```bash
   # Replace variables
   export DOCKER_REGISTRY=your-registry
   export IMAGE_TAG=latest
   envsubst < kubernetes/backend-deployment.yaml | kubectl apply -f -
   ```

5. Deploy the frontend:
   ```bash
   # Replace variables
   export DOCKER_REGISTRY=your-registry
   export IMAGE_TAG=latest
   envsubst < kubernetes/frontend-deployment.yaml | kubectl apply -f -
   ```

6. Deploy the ingress:
   ```bash
   kubectl apply -f kubernetes/ingress.yaml
   ```

7. Verify the deployment:
   ```bash
   kubectl get pods -n commitly
   kubectl get services -n commitly
   kubectl get ingress -n commitly
   ```

## Render Deployment

### Prerequisites

- Render account (https://render.com)
- GitHub repository with your Commitly code

### Deployment Steps

1. Fork or push your Commitly repository to GitHub.

2. Log in to Render and create a new "Blueprint" deployment.

3. Connect your GitHub repository.

4. Render will automatically detect the `render.yaml` file and configure the services.

5. Review the configuration and click "Apply".

6. Render will deploy both the frontend and backend services, and create a MongoDB database.

7. Once deployment is complete, you can access your application at the provided URLs.

### Manual Configuration (Alternative)

If you prefer to set up services manually:

1. Create a MongoDB service or use Render's managed MongoDB.

2. Create a Web Service for the backend:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node index.js start`
   - Environment Variables: 
     - `NODE_ENV=production`
     - `JWT_SECRET=your_secret`
     - `MONGODB_URI=your_mongodb_connection_string`

3. Create a Static Site for the frontend:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables:
     - `VITE_API_URL=https://your-backend-url.onrender.com`

## CI/CD Setup

### GitHub Actions

The repository includes GitHub Actions workflows for CI/CD:

- `.github/workflows/backend-ci-cd.yml`: Builds, tests, and deploys the backend
- `.github/workflows/frontend-ci-cd.yml`: Builds, tests, and deploys the frontend

To enable CI/CD:

1. Add the following secrets to your GitHub repository:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password
   - `KUBE_CONFIG`: Base64-encoded Kubernetes config file

2. Push to the `main` branch to trigger the workflow.

## Environment Variables

### Backend Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `NODE_ENV`: Environment (development/production)

### Frontend Variables

- `VITE_API_URL`: URL of the backend API

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Check if MongoDB is running
   - Verify the connection string
   - Ensure network connectivity between services

2. **Frontend API Calls Failing**:
   - Check if the backend is running
   - Verify the `VITE_API_URL` environment variable
   - Check for CORS issues

3. **Kubernetes Pods Not Starting**:
   - Check pod status: `kubectl describe pod <pod-name> -n commitly`
   - Check logs: `kubectl logs <pod-name> -n commitly`
   - Verify resource constraints

4. **Render Deployment Failing**:
   - Check build logs in the Render dashboard
   - Verify environment variables
   - Check if the MongoDB connection is correct

For additional support, please open an issue on the GitHub repository.
