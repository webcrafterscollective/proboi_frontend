// --- src/pages/AccountDashboardPage.js ---
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import OrderHistoryPage from './OrderHistoryPage';

const AccountDashboardPage = ({ navigateTo }) => {
    const { user, orders, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            navigateTo('login');
        }
    }, [user, loading, navigateTo]);

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mb-8">Manage your account and view your orders.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                    <OrderHistoryPage orders={orders} navigateTo={navigateTo} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-semibold">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <button className="mt-4 bg-primary-accent text-white font-bold py-2 px-4 rounded-lg">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDashboardPage;