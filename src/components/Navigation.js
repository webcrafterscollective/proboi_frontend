import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuIcon } from './icons';

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

const Navigation = ({ navigateTo }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <>
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
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                <MenuIcon className="w-6 h-6 text-header-text" />
            </button>
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
        </>
    );
};

Navigation.propTypes = {
    navigateTo: PropTypes.func.isRequired,
};

export default Navigation;
