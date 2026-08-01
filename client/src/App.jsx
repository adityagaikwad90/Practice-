import React, { useState, useEffect } from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  Activity,
  Plus,
  Search,
  Trash2,
  Check,
  Server,
  Zap
} from 'lucide-react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, completionRate: '0%' });
  const [serverHealth, setServerHealth] = useState({ status: 'checking', message: 'Connecting to Express server...' });
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newPriority, setNewPriority] = useState('Medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  // Check Express Backend Health
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerHealth({ status: 'online', message: data.message });
      } else {
        setServerHealth({ status: 'offline', message: 'Server returned error status.' });
      }
    } catch (error) {
      setServerHealth({ status: 'offline', message: 'Unable to connect to Express backend.' });
    }
  };

  // Fetch Tasks and Stats
  const fetchData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/stats')
      ]);

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data from server:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchData();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          priority: newPriority
        })
      });

      if (res.ok) {
        setNewTitle('');
        fetchData();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = async (id, currentCompleted) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentCompleted })
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filter Tasks locally
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Active' && !task.completed) ||
      (filterStatus === 'Completed' && task.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-icon-box">
            <Layers size={26} />
          </div>
          <div>
            <h1 className="brand-title">Aditya Gaikwad Task</h1>
            <p className="brand-subtitle">React (Vite) + Express (Node.js) Starter</p>
          </div>
        </div>

        <div className="status-badge">
          <span className={`status-indicator ${serverHealth.status}`} />
          <Server size={14} style={{ opacity: 0.8 }} />
          <span>Node.js API: <strong>{serverHealth.status}</strong></span>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <p>Total Tasks</p>
            <div className="metric-value">{stats.total}</div>
          </div>
          <div className="metric-icon-wrapper">
            <Layers size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Completed</p>
            <div className="metric-value" style={{ color: 'var(--success)' }}>{stats.completed}</div>
          </div>
          <div className="metric-icon-wrapper" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Pending</p>
            <div className="metric-value" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
          </div>
          <div className="metric-icon-wrapper" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Completion Rate</p>
            <div className="metric-value">{stats.completionRate}</div>
          </div>
          <div className="metric-icon-wrapper">
            <Activity size={22} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-card">
        {/* Add Task Form */}
        <section className="task-form-wrapper">
          <h2 className="task-form-title">
            <Zap size={18} color="var(--accent-primary)" />
            Add New Task
          </h2>
          <form onSubmit={handleAddTask} className="task-form">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="input-text"
              required
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="select-custom"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Design">Design</option>
              <option value="General">General</option>
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="select-custom"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button type="submit" className="btn-primary">
              <Plus size={18} />
              <span>Add Task</span>
            </button>
          </form>
        </section>

        {/* Controls: Search & Filters */}
        <div className="controls-header">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {['All', 'Active', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select-custom"
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.75rem' }}
            >
              <option value="All">All Categories</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Design">Design</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="empty-state">Loading tasks from Express API...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <Layers size={40} className="empty-state-icon" />
            <p>No tasks found matching your criteria.</p>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-left">
                  <div
                    className="checkbox-custom"
                    onClick={() => handleToggleTask(task.id, task.completed)}
                  >
                    {task.completed && <Check size={14} />}
                  </div>
                  <div className="task-content">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                      <span className="tag-category">{task.category}</span>
                      <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                        • {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn-icon-delete"
                  title="Delete Task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React 18, Vite, Express & Node.js • Proxy target: <code>http://localhost:5001</code></p>
      </footer>
    </div>
  );
}
