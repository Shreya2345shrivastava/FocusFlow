import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';


const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');

  // Notification logic
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const today = new Date().toISOString().slice(0, 10);
    tasks.forEach(task => {
      if (task.deadline && task.deadline <= today && !completed.includes(task.id)) {
        // Only notify once per session for each task
        if (!task.notified) {
          new Notification("Task Due!", {
            body: `Task: ${task.text}\nPriority: ${task.priority}\nDeadline: ${task.deadline}`,
          });
          task.notified = true;
        }
      }
    });
  }, [tasks, completed]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
      else console.error('Failed to fetch tasks:', data.message || 'Unknown error');
    } catch (error) {
      console.error('Network error while fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      console.error('Task text is required.');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: input.trim(), priority, deadline }), // Changed 'text' to 'title'
      });
      const data = await res.json();
      if (res.ok) {
        setInput('');
        setPriority('Medium');
        setDeadline('');
        fetchTasks();
      } else {
        console.error('Failed to add task:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error while adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is required to delete a task.');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        console.error('Failed to delete task:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error while deleting task:', error);
    }
  };

  const toggleComplete = (id) => {
    setCompleted(prev => {
  if (prev.includes(id)) {
    return prev.filter(cid => cid !== id);
  } else {
    return [...prev, id]; 
  }
});
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'linear-gradient(120deg, #1d3995ff 0%, #f8fafc 100%)', boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10 }}>
        <Navbar />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <div style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#4f46e5', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>Tasks</h2>
          <p style={{ color: '#334155', marginBottom: 24 }}>Organize and manage your to-dos here.</p>
        <form onSubmit={addTask} style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
            style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem', flex: 2 }}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem', flex: 1 }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem', flex: 1 }}
          />
          <button type="submit" style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}>
            Add
          </button>
        </form>
        {/* Analytics Section */}
        <div style={{ marginBottom: 18, textAlign: 'left', color: '#334155', fontSize: '1.1rem', fontWeight: 500 }}>
          <span>Total Tasks: {tasks.length}</span>
          <span style={{ marginLeft: 18 }}>Completed: {completed.length}</span>
          <span style={{ marginLeft: 18 }}>
            Completion: {tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0}%
          </span>
        </div>
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
          {tasks.map(task => (
            <li key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>{task.title}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Priority: {task.priority}</p>
                {task.deadline && <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Deadline: {task.deadline}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => toggleComplete(task.id)} style={{ background: completed.includes(task.id) ? '#22c55e' : '#6366f1', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 500, cursor: 'pointer' }}>
                  {completed.includes(task.id) ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => deleteTask(task._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default TasksPage;
