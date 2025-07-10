import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('jwt_token');
      const tokenTimestamp = localStorage.getItem('jwt_timestamp');
      const storedUser = localStorage.getItem('user');

      if (storedToken && tokenTimestamp && storedUser) {
        const isTokenExpired = (new Date().getTime() - tokenTimestamp) > 24 * 60 * 60 * 1000;
        if (isTokenExpired) {
          logout();
        } else {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/me`, {
              headers: {
                'Authorization': `Bearer ${storedToken}`
              }
            });

            if (response.ok) {
              const userData = await response.json();
              const userToSet = { name: userData.name, email: userData.email };
              setUser(userToSet);
              localStorage.setItem('user', JSON.stringify(userToSet));
              setToken(storedToken);
              fetchOrders(storedToken);
            } else {
              logout();
            }
          } catch (error) {
            console.error("Failed to validate token:", error);
            logout();
          }
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (credentials) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/jwt-auth/v1/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
          const userToSet = { name: data.user_display_name, email: data.user_email };
          setUser(userToSet);
          setToken(data.token);
          localStorage.setItem('jwt_token', data.token);
          localStorage.setItem('jwt_timestamp', new Date().getTime());
          localStorage.setItem('user', JSON.stringify(userToSet));
          fetchOrders(data.token);
        } else {
          throw new Error(data.message);
        }
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOrders([]);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_timestamp');
    localStorage.removeItem('user');
  };

  const fetchOrders = async (authToken) => {
    try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const response = await fetch(`${process.env.REACT_APP_API_URL}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const orderData = await response.json();
        setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, orders, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);