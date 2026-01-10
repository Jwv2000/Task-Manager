const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Task Manager API is running!");
});

app.post("/tasks", (req, res) => {
  const { title, description, startTime, endTime } = req.body;

  if (!title || !startTime || !endTime) {
    return res
      .status(400)
      .json({ error: "Title, startTime, and endTime are required" });
  }

  const newTask = {
    id: nextId++,
    title: title,
    description: description || "",
    startTime: startTime,
    endTime: endTime,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Task Manager running on http://localhost:${PORT}`);
});
// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const { title, description, startTime, endTime } = req.body;

  if (!title || !startTime || !endTime) {
    return res
      .status(400)
      .json({ error: "Title, startTime, and endTime are required" });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    startTime,
    endTime,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});
// Edit a task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, startTime, endTime } = req.body;

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Update fields if provided
  if (title) task.title = title;
  if (description) task.description = description;
  if (startTime) task.startTime = startTime;
  if (endTime) task.endTime = endTime;

  res.json(task);
});
// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1); // remove task
  res.json({ message: `Task ${taskId} deleted` });
});
