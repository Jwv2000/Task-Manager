# Task Manager

A full-stack task management application for PCGC staff, built with Node.js, Express, Sequelize, PostgreSQL, and React.

## Features

- User authentication (login/register)
- Task creation, editing, and deletion
- Calendar view for tasks
- Role-based access (manager vs employee)
- Responsive UI with FullCalendar integration

## Prerequisites

- Node.js (v16 or higher)
- npm
- PostgreSQL database
- (Optional) Docker and Docker Compose

## Local Development Setup

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jwv2000/Task-Manager.git
   cd Task-Manager
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env` (if available) or create one with:
     ```
     JWT_SECRET=your_secret_key
     DB_NAME=task_manager
     DB_USER=postgres
     DB_PASS=password
     DB_HOST=localhost
     PORT=5000
     ```

3. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - Backend will be available at `http://localhost:5000`
   - Frontend will be available at `http://localhost:3000`

### Option 2: Manual Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jwv2000/Task-Manager.git
   cd Task-Manager
   ```

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Set up PostgreSQL database**:
   - Create a database named `task_manager`
   - Update `.env` file in `backend/` with your DB credentials

4. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```
   - Backend runs on `http://localhost:5000`

5. **Start the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```
   - Frontend runs on `http://localhost:3000`

6. **Access the application**:
   - Open `http://localhost:3000` in your browser
   - Register a new account or login

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login
- `GET /tasks` - Get tasks (authenticated)
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Project Structure

```
Task-Manager/
├── backend/          # Node.js/Express API
│   ├── config/       # Database config
│   ├── middleware/   # Auth middleware
│   ├── models/       # Sequelize models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context
│   │   ├── hooks/       # Custom hooks
│   │   └── ...
│   └── public/      # Static assets
├── docker-compose.yml  # Docker setup
└── README.md
```

## Technologies Used

- **Backend**: Node.js, Express.js, Sequelize, PostgreSQL, JWT, bcrypt
- **Frontend**: React, FullCalendar, Axios, React Modal
- **DevOps**: Docker, Docker Compose

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC