import React from 'react';
import { SearchIcon } from './icons';

const SearchBar = () => {
    return (
        <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
            <div className="relative w-full max-w-md">
                <input type="search" placeholder="Search" className="w-full pl-12 pr-4 py-3 bg-[#F6F5FF] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent" />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon className="text-gray-400 w-5 h-5" /></div>
            </div>
        </div>
    );
};

export default SearchBar;
