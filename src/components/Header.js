import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../contexts/CartContext';
import { HeartIcon, ShoppingCartIcon } from './icons';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Header = ({ navigateTo }) => {
    const { items } = useCart();

    return (
        <header className="bg-white sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
                            <Logo />
                        </div>
                        <Navigation navigateTo={navigateTo} />
                    </div>

                    <div className="flex items-center">
                        <SearchBar />
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <UserMenu navigateTo={navigateTo} />
                            <button className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100">
                                <HeartIcon className="w-6 h-6" />
                            </button>
                            <button onClick={() => navigateTo('cart')} className="relative p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                                <ShoppingCartIcon className="w-6 h-6" />
                                {items.length > 0 && (
                                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">
                                        {items.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    navigateTo: PropTypes.func.isRequired,
};

export default Header;