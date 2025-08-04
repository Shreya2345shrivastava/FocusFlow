# FocusFlow

FocusFlow is a full-stack productivity application built with the MERN stack (MongoDB, Express, React, Node.js). It helps users manage tasks, track Pomodoro sessions, and maintain a personal journal—all in one place.

🚀 **Live Demo**: https://focus-flow-kohl.vercel.app

## Features

- User authentication (JWT-based)
- Task management (CRUD)
- Pomodoro timer tracking
- Personal journal with entries
- Secure RESTful API

## Tech Stack

- MongoDB & Mongoose
- Express.js
- React.js (Vite)
- Node.js

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/focusflow.git
   cd focusflow
   ```
2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your values (see `.env` in the repo for reference).
4. **Start the backend server:**
   ```bash
   npm run dev
   ```
5. **Install client dependencies and start the frontend:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## API Endpoints

- `POST /api/user/signup` — Register a new user
- `POST /api/user/login` — Login
- `GET /api/journals` — Get all journals (auth required)
- `POST /api/journals` — Create a journal entry (auth required)
- `GET /api/tasks` — Get all tasks (auth required)
- `POST /api/tasks` — Create a task (auth required)
- `PATCH /api/tasks/:id` — Update a task (auth required)
- `DELETE /api/tasks/:id` — Delete a task (auth required)
- `POST /api/pomodoro/save` — Save a Pomodoro session (auth required)

## Folder Structure

- `client/` — React frontend
- `server/` — Express backend

## License

MIT
