import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from './AuthContext'
import api from '../utils/api'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCart = async () => {
    if (!token) return
    setLoading(true)
    try {
      const cart = await api.getCart(token)
      setItems(cart.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [token])

  const addToCart = async (bookId, quantity) => {
    if (!token) {
      setError('You must be logged in to add items to the cart.')
      return
    }
    setLoading(true)
    try {
      await api.addToCart(token, { id: bookId, quantity })
      await fetchCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    if (!token) return
    setLoading(true)
    try {
      await api.removeFromCart(token, itemId)
      await fetchCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    if (!token) return
    setLoading(true)
    try {
      await api.clearCart(token)
      setItems([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const total = items.reduce((sum, item) => sum + item.totals.total, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);
