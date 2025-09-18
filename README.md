# Commitly

Commitly is a GitHub-inspired platform for managing code repositories. Create projects, track issues, and collaborate with other developers - all in one place.

## What's Inside

This project combines a modern React frontend with a  Node.js backend:

- **Frontend**: React with Vite, clean UI components
- **Backend**: Express API with MongoDB storage
- **Bonus**: Simple CLI for local version control with S3 storage

## Getting Started

### Setup

1. Make sure you have Node.js 18+ and MongoDB installed
2. Create a `.env` file in the backend folder:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/commitly
JWT_SECRET_KEY=your_secret_key
```

For S3 features (optional):
```
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

### Running the App

**Backend:**
```
cd backend
npm install
node index.js start
```

**Frontend:**
```
cd frontend
npm install
npm run dev
```

The app will be available at http://localhost:5173, connecting to the backend at http://localhost:3000.

## Main Features

- **User Management**: Create accounts, login, update profiles
- **Repository Management**: Create public/private repos with descriptions
- **Issue Tracking**: Create and manage issues for each repository
- **Dashboard**: View your repos and discover trending projects

## API Endpoints

All endpoints are relative to `http://localhost:3000`

### User Endpoints
- `POST /signup` - Register a new user
- `POST /login` - Authenticate user
- `GET /allUsers` - List all users
- `GET /userProfile/:id` - Get user details
- `PUT /updateProfile/:id` - Update user profile
- `DELETE /deleteProfile/:id` - Delete user account

### Repository Endpoints
- `POST /create` - Create a new repository
- `GET /repo/all` - List all repositories
- `GET /repo/:id` - Get repository by ID
- `GET /repo/name/:name` - Get repository by name
- `GET /repo/user/:userID` - Get repositories for a user
- `PUT /repo/update/:id` - Update repository content/description
- `PATCH /repo/update/:id` - Toggle repository visibility
- `DELETE /repo/delete/:id` - Delete a repository
- `POST /repo/:id/files` - Add file to repository
- `GET /repo/:id/files` - Get repository files
- `GET /repo/:id/files/:filePath` - Get file content
- `DELETE /repo/:id/files/:filePath` - Delete file from repository

### Issue Endpoints
- `POST /issue/create` - Create a new issue
- `GET /issue/all` - List all issues
- `GET /issue/:id` - Get issue by ID
- `PUT /issue/:id` - Update an issue
- `DELETE /issue/:id` - Delete an issue

## Command Line Tools

Commitly includes a simple Git-like CLI for local version control:

```
# Initialize a repo
node index.js init

# Add files
node index.js add myfile.txt

# Commit changes
node index.js commit "Added new feature"

# Push/pull from S3
node index.js push
node index.js pull

# Revert to previous commit
node index.js revert --commitId abc123
```

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Express, MongoDB, JWT authentication
- **Storage**: MongoDB for app data, S3 for CLI version control

## Kubernetes

# Kubernetes

This is the industry standard for Kubernetes deployments.  
Each file serves a specific purpose following best practices.

## Why multiple files?

- **Separation of concerns** – Each component (frontend/backend) has its own files, making it easier to manage and update independently.  
- **Security best practices** – Secrets are separated from application code and properly encrypted.  
- **Resource management** – CPU/memory limits prevent any container from consuming too many resources, ensuring stability.  
- **Horizontal auto-scaling** – Automatically creates new containers when load increases, essential for production reliability.  
- **Health monitoring** – Readiness/liveness probes ensure your app is actually working, not just running.  
- **Service discovery** – Services allow components to find each other without hardcoding IP addresses.  
- **Ingress configuration** – Routes external traffic properly to internal services.  

## Primary Benefits

- **Reliability** – Your app will self-heal if containers crash.  
- **Scalability** – Can handle more traffic without manual intervention.  
- **Portability** – Works the same locally or in any cloud (GKE, AWS, Azure).  
- **Repeatability** – Environment is defined as code, eliminating "it works on my machine" problems.  

## Note
- Run and tested on my local computer
