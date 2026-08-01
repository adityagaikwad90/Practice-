const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initial In-Memory Database
let tasks = [
  {
    id: 1,
    title: 'Initialize Express Backend API',
    category: 'Backend',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    title: 'Setup React + Vite Frontend Client',
    category: 'Frontend',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 3,
    title: 'Connect Frontend Proxy to Node Server',
    category: 'Fullstack',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Build Dark Glassmorphism Dashboard UI',
    category: 'Design',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 5;

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "online",
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Get All Tasks (with search & category filter support)
app.get('/api/tasks', (req, res) => {
  const { search, category, completed } = req.query;
  let filtered = [...tasks];

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(t => t.title.toLowerCase().includes(query));
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(t => t.category === category);
  }

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filtered = filtered.filter(t => t.completed === isCompleted);
  }

  res.json(filtered);
});

// Create New Task
app.post('/api/tasks', (req, res) => {
  const { title, category = 'General', priority = 'Medium' } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    category,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

// Update / Toggle Task Completion
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const { title, category, priority, completed } = req.body;

  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (category !== undefined) tasks[taskIndex].category = category;
  if (priority !== undefined) tasks[taskIndex].priority = priority;
  if (completed !== undefined) tasks[taskIndex].completed = Boolean(completed);

  res.json(tasks[taskIndex]);
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.json({ message: 'Task deleted successfully.', id: taskId });
});

// Get Summary Statistics
app.get('/api/stats', (req, res) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  res.json({
    total,
    completed,
    pending,
    completionRate: `${completionRate}%`
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME}`);
  console.log(`📦 Version: ${process.env.APP_VERSION}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use.`);
    console.error(`💡 Tip: If you ran 'npm run dev', your server is ALREADY running on http://localhost:${PORT}!\n`);
  } else {
    console.error('Server error:', err);
  }
});

