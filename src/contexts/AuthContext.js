import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateStoredToken = async () => {
      const storedToken = localStorage.getItem('jwt_token');
      if (storedToken) {
        try {
          await api.validateToken(storedToken);
          const storedUser = JSON.parse(localStorage.getItem('user'));
          setToken(storedToken);
          if(storedUser) setUser(storedUser);
          fetchOrders(storedToken);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    validateStoredToken();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await api.login(credentials);
      const userToSet = { name: data.user_display_name, email: data.user_email };
      setUser(userToSet);
      setToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('user', JSON.stringify(userToSet));
      fetchOrders(data.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await api.register(userData);
      await login({ username: userData.email, password: userData.password });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOrders([]);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  };

  const fetchOrders = async (authToken) => {
    try {
      const orderData = await api.getOrders(authToken);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, orders, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);