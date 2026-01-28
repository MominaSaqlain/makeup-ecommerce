// src/context/AuthContext.js - FIXED VERSION
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      
      console.log('Auth Check:', { token, userData });
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
          console.log('User authenticated from localStorage');
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      } else {
        console.log('No auth data in localStorage');
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Login attempt for:', email);
      const response = await api.post('/api/auth/login/', { email, password });
      
      console.log('Login response:', response.data);
      
      // Save to localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      console.log('Login successful, isAuthenticated should be true');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};