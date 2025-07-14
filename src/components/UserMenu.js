import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, LogOutIcon } from './icons';

const UserMenu = ({ navigateTo }) => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigateTo('home');
        setDropdownOpen(false);
    };

    if (!user) {
        return (
            <button onClick={() => navigateTo('login')} className="p-2 text-header-text hover:text-primary-accent rounded-full hover:bg-gray-100">
                <UserIcon className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="relative">
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="p-2 text-header-text hover:text-primary-accent rounded-full hover:bg-gray-100 flex items-center space-x-2">
                <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=6C63FF&color=fff`} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('orderHistory'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"><LogOutIcon className="w-4 h-4 mr-2" />Logout</a>
                </div>
            )}
        </div>
    );
};

UserMenu.propTypes = {
    navigateTo: PropTypes.func.isRequired,
};

export default UserMenu;
