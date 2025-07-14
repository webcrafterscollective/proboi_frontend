import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const OrderHistoryPage = ({ navigateTo }) => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const fetchedOrders = await api.getOrders(token);
                setOrders(fetchedOrders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    if (loading) {
        return <div className="text-center p-8">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
                <p className="text-gray-500">You have no orders yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <div className="font-semibold">Order #{order.id}</div>
                            <div className="text-sm text-gray-500">{new Date(order.date_created).toLocaleDateString()}</div>
                            <div className={`capitalize text-sm font-medium px-2 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                            </div>
                            <div className="font-semibold">${order.total}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;