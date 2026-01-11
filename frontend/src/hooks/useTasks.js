import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const updateTask = async (id, taskData) => {
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE}/tasks/${id}`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return { tasks, addTask, updateTask, deleteTask };
};