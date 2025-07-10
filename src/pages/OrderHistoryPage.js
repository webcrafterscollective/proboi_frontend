// --- src/pages/OrderHistoryPage.js ---
import React from 'react';

const OrderHistoryPage = ({ orders, navigateTo, limit }) => {
    // Ensure orders is an array before slicing
    const displayOrders = limit && Array.isArray(orders) ? orders.slice(0, limit) : (Array.isArray(orders) ? orders : []);

    if (!displayOrders.length) {
        return <p className="text-gray-500">You have no orders yet.</p>;
    }

    return (
        <div className={!limit ? "container mx-auto px-4 sm:px-6 lg:px-8 mt-8" : ""}>
            {!limit && <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>}
            <div className="space-y-4">
                {displayOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <div className="font-semibold">Order #{order.id}</div>
                            <div className="text-sm text-gray-500">{order.date_created ? new Date(order.date_created).toLocaleDateString() : 'N/A'}</div>
                            <div className={`capitalize text-sm font-medium px-2 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</div>
                            <div className="font-semibold">{order.total} {order.currency}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;