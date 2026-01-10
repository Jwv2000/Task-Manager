const express = require("express");
const cors = require("cors"); // <-- added CORS
const app = express();
const PORT = 3000;

app.use(cors()); // <-- allow requests from frontend
app.use(express.json());

// Mock users (manager + employees)
let users = [
  { id: 1, username: "manager", role: "manager" },
  { id: 2, username: "employee1", role: "employee" },
  { id: 3, username: "employee2", role: "employee" },
];

// In-memory tasks
let tasks = [];
let nextTaskId = 1;

// Login endpoint
app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });
  res.json(user);
});

// Get all users (for assigning tasks)
app.get("/users", (req, res) => {
  res.json(users);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add new task
app.post("/tasks", (req, res) => {
  const {
    title,
    description,
    taskDate,
    startTime,
    endTime,
    assignedTo,
    taskType,
    status,
  } = req.body;

  const newTask = {
    id: nextTaskId++,
    title,
    description,
    taskDate,
    startTime,
    endTime,
    assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
    taskType: taskType || "single",
    status: status || "To Do",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task (for drag/drop or edits)
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  Object.assign(task, req.body);
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: `Task ${id} deleted` });
});

app.listen(PORT, () => {
  console.log("Task Manager API is running!");
});
