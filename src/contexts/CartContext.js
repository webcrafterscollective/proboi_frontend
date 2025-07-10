// --- src/contexts/CartContext.js ---
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (book) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === book.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) =>
    setItems(prev => prev.filter(item => item.id !== bookId));

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
