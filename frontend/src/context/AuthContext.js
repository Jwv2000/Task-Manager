import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Optionally verify token
      setUser({}); // Set user from token if needed
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    setUser({ role: res.data.role });
  };

  const register = async (username, password, role) => {
    await axios.post(`${API_BASE}/auth/register`, { username, password, role });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};