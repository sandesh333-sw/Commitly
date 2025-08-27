# Commitly

A simple GitHub-like app with a Node.js + Express + MongoDB backend and a React + Vite frontend. Includes a tiny local VCS-like CLI that pushes/pulls commit snapshots to S3.

## Monorepo Structure

- `backend/`: Express API, Socket.IO, MongoDB
- `frontend/`: React (Vite), Primer components

## Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- AWS account with an S3 bucket (optional; only for CLI push/pull)

## Environment

Create `backend/.env`:

```
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET_KEY=your_jwt_secret
AWS_REGION=us-east-1
S3_BUCKET=commitlyp
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

Note: `backend/config/aws-config.js` currently sets `region` and uses bucket `commitlyp`. You can change that or use envs as needed.

## Install & Run

- Backend
  - `cd backend`
  - `npm install`
  - Dev: `node index.js start`
- Frontend
  - `cd frontend`
  - `npm install`
  - `npm run dev`

Frontend runs at `http://localhost:5173` by default; backend at `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000`

- Users
  - `POST /signup` → { username, email, password } → { token, userId }
  - `POST /login` → { email, password } → { token, userId }
  - `GET /allUsers`
  - `GET /userProfile/:id`
  - `PUT /updateProfile/:id` → { email?, password? }
  - `DELETE /deleteProfile/:id`

- Repositories
  - `POST /create` → { owner, name, description?, visibility?, content?, issues? }
  - `GET /repo/all`
  - `GET /repo/:id`
  - `GET /repo/name/:name`
  - `GET /repo/user/:userId`
  - `PUT /repo/update/:id` → { content?, description? }
  - `PATCH /repo/update/:id` → toggles visibility
  - `DELETE /repo/delete/:id`

- Issues
  - `POST /issue/create` → { title, description, repository }
  - `GET /issue/all`
  - `GET /issue/:id`
  - `PUT /issue/:id` → { title?, description?, status? }
  - `DELETE /issue/:id`

## Frontend Pages

- Login `/auth` and Signup `/signup`
- Dashboard `/` shows suggested repos and your repos
- Profile `/profile` (stub)

## Wiring Notes

- Login/Signup store `token` and `userId` in `localStorage`. The dashboard fetches:
  - `GET /repo/user/:userId` for your repos
  - `GET /repo/all` for suggested repos
- If you change API base, update axios calls in `frontend/src/components/*`.

## CLI (local VCS)

Run from `backend/` project using yargs commands:

```
node index.js init
node index.js add <path/to/file>
node index.js commit "message"
node index.js push
node index.js pull
node index.js revert --commitId <id>
```

Creates a `.commitly/` folder with `staging/` and `commits/`. Push/pull moves commit files to S3 under `commits/<id>/`.

## Development Standards

- Code style: basic, readable, small functions, early returns
- Security: bcrypt password hashing, JWT auth (add auth middleware to protect private routes as needed)
- Error handling: proper HTTP statuses and JSON messages
- Branching: feature branches, PR reviews

## Roadmap / Improvements

- Add protected routes and JWT header support
- Create pages for Create Repo and Repo Details (toggle visibility, update, delete, issues)
- Enhance Profile page to view/update/delete user
- Add global axios baseURL and interceptor for Authorization
- UI polish with consistent spacing, empty states, and loading indicators
