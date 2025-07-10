// --- src/components/Header.js ---
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  LogOutIcon,
  MenuIcon
} from './icons'; // adjust the path if `icons.js` is not in the same folder
import Logo from './Logo'; // adjust path if needed

const HeaderComponent = ({ navigateTo }) => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const handleLogout = () => { logout(); navigateTo('home'); setDropdownOpen(false); };

    const navLinks = [
        {
            name: 'Books',
            page: 'books',
            subcategories: [
                { name: 'Fiction', page: 'fiction' },
                { name: 'Non Fiction', page: 'non-fiction' },
                { name: 'Essays', page: 'essays' },
                { name: 'Poetry', page: 'poetry' },
                { name: 'Young Adults', page: 'young-adults' },
                { name: 'Biography', page: 'biography' },
                { name: 'Science Fiction', page: 'science-fiction' },
                { name: 'Children & Comics', page: 'children-comics' },
            ]
        },
        { name: 'Text Books', page: 'textbooks' },
        { name: 'Old Books', page: 'oldbooks' },
        { name: 'Publishers', page: 'publishers' },
        { name: 'Authors', page: 'authors' },
        { name: 'Self Publishing', page: 'selfPublishing' },
        { name: 'Accessories', page: 'accessories' },
        { name: 'Event', page: 'events' },
        {
            name: 'Fashion',
            page: 'fashion',
            subcategories: [
                { name: 'Men', page: 'men-fashion' },
                { name: 'Women', page: 'women-fashion' },
            ]
        },
    ];

    return (
        <header className="bg-header-bg sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('home')}><Logo /></div>
                        <nav className="hidden md:flex space-x-6">
                            {navLinks.map(link => (
                                <div key={link.name} className="relative" onMouseEnter={() => setOpenMenu(link.name)} onMouseLeave={() => setOpenMenu(null)}>
                                    <a href="#" onClick={(e) => {e.preventDefault(); navigateTo(link.page)}} className="text-header-text hover:text-primary-accent font-medium">{link.name}</a>
                                    {link.subcategories && openMenu === link.name && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            {link.subcategories.map(sublink => (
                                                <a key={sublink.name} href="#" onClick={(e) => {e.preventDefault(); navigateTo(sublink.page)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{sublink.name}</a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
                            <div className="relative w-full max-w-md">
                                <input type="search" placeholder="Search" className="w-full pl-12 pr-4 py-3 bg-[#F6F5FF] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent" />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon className="text-gray-400 w-5 h-5" /></div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {user ? (
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
                            ) : (
                                <button onClick={() => navigateTo('login')} className="p-2 text-header-text hover:text-primary-accent rounded-full hover:bg-gray-100"><UserIcon className="w-6 h-6" /></button>
                            )}
                            <button className="p-2 text-header-text hover:text-[#EF6B4A] rounded-full hover:bg-gray-100"><HeartIcon className="w-6 h-6" /></button>
                            <button onClick={() => navigateTo('cart')} className="relative p-2 text-header-text hover:text-primary-accent rounded-full hover:bg-gray-100">
                                <ShoppingCartIcon className="w-6 h-6" />
                                {items.length > 0 && <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-[#EF6B4A] text-white text-xs text-center">{items.length}</span>}
                            </button>
                            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                <MenuIcon className="w-6 h-6 text-header-text" />
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                <div key={link.name}>
                                    <a href="#" onClick={(e) => {e.preventDefault(); navigateTo(link.page)}} className="block px-3 py-2 rounded-md text-base font-medium text-header-text hover:bg-gray-100">{link.name}</a>
                                    {link.subcategories && (
                                        <div className="pl-4">
                                            {link.subcategories.map(sublink => (
                                                <a key={sublink.name} href="#" onClick={(e) => {e.preventDefault(); navigateTo(sublink.page)}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100">{sublink.name}</a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
export default HeaderComponent;