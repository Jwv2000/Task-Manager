const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let employees = [
  { id: 1, name: "John Vall", role: "manager" },
  { id: 2, name: "Employee A", role: "employee" },
  { id: 3, name: "Employee B", role: "employee" }
];

let notifications = {
  chemical: [],
  fertilizer: [],
  emergencies: []
};

let projects = [];

let weather = { forecast: "Sunny, 75°F" };

// ---------------- API ----------------

// Auth/Login (basic)
app.post('/login', (req, res) => {
  const { name } = req.body;
  const user = employees.find(e => e.name === name);
  if(user) return res.json(user);
  res.status(401).json({ error: "User not found" });
});

// Tasks
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.json(task);
});
app.put('/tasks/:id', (req, res) => {
  tasks = tasks.map(t => t.id === Number(req.params.id) ? {...t, ...req.body} : t);
  res.json({ success: true });
});
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.json({ success: true });
});

// Employees
app.get('/employees', (req, res) => res.json(employees));

// Notifications
app.get('/notifications', (req, res) => res.json(notifications));

// Projects
app.get('/projects', (req, res) => res.json(projects));
app.post('/projects', (req, res) => {
  const project = { id: Date.now(), ...req.body };
  projects.push(project);
  res.json(project);
});

// Weather
app.get('/weather', (req, res) => res.json(weather));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
