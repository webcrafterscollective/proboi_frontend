import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const CheckoutPage = ({ navigateTo }) => {
  const { items, total, clearCart } = useCart();
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.checkout(token, {
        payment_method: 'bacs', // Basic bank transfer
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true,
        billing: {
          first_name: formData.fullName.split(' ')[0],
          last_name: formData.fullName.split(' ').slice(1).join(' '),
          address_1: formData.address,
          country: 'US',
          email: user.email,
          phone: '123456789',
        },
        shipping: {
          first_name: formData.fullName.split(' ')[0],
          last_name: formData.fullName.split(' ').slice(1).join(' '),
          address_1: formData.address,
          country: 'US',
        },
        line_items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      alert('Thank you for your order!');
      navigateTo('order-history');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleCheckout} className="space-y-6">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" name="fullName" onChange={handleChange} className="w-full mt-1 px-4 py-2 bg-[#F6F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input type="text" name="address" onChange={handleChange} className="w-full mt-1 px-4 py-2 bg-[#F6F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" required />
          </div>
          <h2 className="text-xl font-semibold pt-4">Payment Details</h2>
          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input type="text" name="cardNumber" placeholder="•••• •••• •••• ••••" onChange={handleChange} className="w-full mt-1 px-4 py-2 bg-[#F6F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" required />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Expiry Date</label>
              <input type="text" name="expiryDate" placeholder="MM/YY" onChange={handleChange} className="w-full mt-1 px-4 py-2 bg-[#F6F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">CVC</label>
              <input type="text" name="cvc" placeholder="•••" onChange={handleChange} className="w-full mt-1 px-4 py-2 bg-[#F6F5FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" required />
            </div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-xl">
            <p>Total to Pay</p>
            <p>{total.toFixed(2)} $</p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button type="submit" className="mt-6 w-full bg-[#EF6B4A] text-white font-bold py-3 rounded-lg hover:bg-[#e05a39] transition-colors" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutPage;