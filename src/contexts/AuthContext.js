import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);