// --- src/App.js ---
import React, { useState, useEffect, useContext } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BestSellerPage from './pages/BestSellerPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SelfPublishingPage from './pages/SelfPublishingPage';

export default function App() {
    const [page, setPage] = useState({ name: 'home', props: {} });
    const navigateTo = (pageName, props = {}) => {
        setPage({ name: pageName, props });
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (page.name) {
            case 'home': return <HomePage navigateTo={navigateTo} />;
            case 'bestSeller': return <BestSellerPage navigateTo={navigateTo} />;
            case 'bookDetails': return <BookDetailsPage navigateTo={navigateTo} bookId={page.props.bookId} />;
            case 'login': return <AuthPage mode="login" navigateTo={navigateTo} />;
            case 'register': return <AuthPage mode="register" navigateTo={navigateTo} />;
            case 'cart': return <CartPage navigateTo={navigateTo} />;
            case 'checkout': return <CheckoutPage navigateTo={navigateTo} />;
            case 'dashboard': return <AccountDashboardPage navigateTo={navigateTo} />;
            case 'orderHistory': return <OrderHistoryPage navigateTo={navigateTo} />;
            case 'selfPublishing': return <SelfPublishingPage navigateTo={navigateTo} />;
            default: return <HomePage navigateTo={navigateTo} />;
        }
    };
    
    const isAuthPage = page.name === 'login' || page.name === 'register';

    return (
        <AuthProvider>
            <CartProvider>
                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                <div className="bg-white font-sans antialiased text-gray-900 flex flex-col min-h-screen">
                    {!isAuthPage && <Header navigateTo={navigateTo} />}
                    <main className="bg-gray-50 pb-12 flex-grow">
                        {renderPage()}
                    </main>
                    {!isAuthPage && <Footer />}
                </div>
            </CartProvider>
        </AuthProvider>
    );
}