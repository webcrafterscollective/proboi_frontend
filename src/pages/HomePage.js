// --- src/pages/HomePage.js ---
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import BookCard from '../components/BookCard';
import ReviewCard from '../components/ReviewCard';
import { mockReviews } from '../data/mockData';

// Very simple query that should work with most WooCommerce GraphQL setups
const GET_HOMEPAGE_BOOKS = gql`
  query GetHomePageBooks {
    products(first: 5) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;

const HomePage = ({ navigateTo }) => {
    const { loading, error, data } = useQuery(GET_HOMEPAGE_BOOKS, {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    });

    console.log('GraphQL Error:', error);
    console.log('GraphQL Data:', data);

    if (loading) return <div className="text-center p-8">Loading books...</div>;
    
    if (error) {
        console.error('Detailed error:', error);
        
        // If there's an error, fall back to mock data
        const mockBooks = [
            {
                id: 'mock-1',
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                price: '$12.99',
                imageUrl: 'https://placehold.co/200x300/E8D5C4/313D5A?text=The+Alchemist'
            },
            {
                id: 'mock-2',
                title: 'Brida',
                author: 'Paulo Coelho',
                price: '$14.99',
                imageUrl: 'https://placehold.co/200x300/313D5A/E8D5C4?text=Brida'
            },
            {
                id: 'mock-3',
                title: 'The Pilgrimage',
                author: 'Paulo Coelho',
                price: '$13.99',
                imageUrl: 'https://placehold.co/200x300/E8D5C4/313D5A?text=The+Pilgrimage'
            },
            {
                id: 'mock-4',
                title: 'Eleven Minutes',
                author: 'Paulo Coelho',
                price: '$11.99',
                imageUrl: 'https://placehold.co/200x300/313D5A/E8D5C4?text=Eleven+Minutes'
            },
            {
                id: 'mock-5',
                title: 'The Witch of Portobello',
                author: 'Paulo Coelho',
                price: '$13.49',
                imageUrl: 'https://placehold.co/200x300/E8D5C4/313D5A?text=The+Witch+of+Portobello'
            }
        ];

        const bestSellers = mockBooks.slice(0, 4);
        const classics = mockBooks.slice(1, 5);

        return (
            <div className="space-y-12">
                {/* Error notice */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        <p className="text-sm">
                            <strong>Note:</strong> Using sample data due to GraphQL connection issues. 
                            Error: {error.message}
                        </p>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">25% discount</h1>
                                <p className="text-2xl sm:text-3xl text-gray-600 mt-2">all Paulo Coelho books!</p>
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <img src="https://placehold.co/200x300/E8D5C4/313D5A?text=Paulo+Coelho+1" alt="Paulo Coelho Book 1" className="rounded-lg shadow-xl transform md:rotate-[-5deg] transition-transform duration-300 hover:scale-105"/>
                                <img src="https://placehold.co/200x300/313D5A/E8D5C4?text=Paulo+Coelho+2" alt="Paulo Coelho Book 2" className="rounded-lg shadow-xl transform md:rotate-[5deg] transition-transform duration-300 hover:scale-105"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Best Seller</h2>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('bestSeller'); }} className="text-sm font-semibold text-primary-accent hover:underline">View All</a>
                        </div>
                        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                            {bestSellers.map(book => <BookCard key={book.id} book={book} navigateTo={navigateTo} />)}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Latest Reviews</h2>
                        </div>
                        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                            {mockReviews.map(review => <ReviewCard key={review.id} review={review} navigateTo={navigateTo} />)}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Classics</h2>
                            <a href="#" className="text-sm font-semibold text-primary-accent hover:underline">View All</a>
                        </div>
                        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                            {classics.map(book => <BookCard key={book.id} book={book} navigateTo={navigateTo} />)}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // Process the actual data from GraphQL
    let allProducts = [];
    
    if (data && data.products && data.products.nodes.length > 0) {
        allProducts = data.products.nodes.map(book => ({
            id: book.id,
            title: book.name,
            author: 'Paulo Coelho', // Default author since we can't reliably query categories
            price: '$12.99', // Default price
            imageUrl: book.image?.sourceUrl || 'https://placehold.co/200x300/E8D5C4/313D5A?text=No+Image',
        }));
    } else {
        // Fallback to mock data if no products returned
        allProducts = [
            {
                id: 'mock-1',
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                price: '$12.99',
                imageUrl: 'https://placehold.co/200x300/E8D5C4/313D5A?text=The+Alchemist'
            },
            {
                id: 'mock-2',
                title: 'Brida',
                author: 'Paulo Coelho',
                price: '$14.99',
                imageUrl: 'https://placehold.co/200x300/313D5A/E8D5C4?text=Brida'
            },
            {
                id: 'mock-3',
                title: 'The Pilgrimage',
                author: 'Paulo Coelho',
                price: '$13.99',
                imageUrl: 'https://placehold.co/200x300/E8D5C4/313D5A?text=The+Pilgrimage'
            },
            {
                id: 'mock-4',
                title: 'Eleven Minutes',
                author: 'Paulo Coelho',
                price: '$11.99',
                imageUrl: 'https://placehold.co/200x300/313D5A/E8D5C4?text=Eleven+Minutes'
            }
        ];
    }

    const bestSellers = allProducts.slice(0, 4);
    const classics = allProducts.slice(0, 4);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">25% discount</h1>
                            <p className="text-2xl sm:text-3xl text-gray-600 mt-2">all Paulo Coelho books!</p>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <img src="https://placehold.co/200x300/E8D5C4/313D5A?text=Paulo+Coelho+1" alt="Paulo Coelho Book 1" className="rounded-lg shadow-xl transform md:rotate-[-5deg] transition-transform duration-300 hover:scale-105"/>
                            <img src="https://placehold.co/200x300/313D5A/E8D5C4?text=Paulo+Coelho+2" alt="Paulo Coelho Book 2" className="rounded-lg shadow-xl transform md:rotate-[5deg] transition-transform duration-300 hover:scale-105"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Best Seller</h2>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('bestSeller'); }} className="text-sm font-semibold text-primary-accent hover:underline">View All</a>
                    </div>
                    <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                        {bestSellers.length > 0 ? (
                            bestSellers.map(book => <BookCard key={book.id} book={book} navigateTo={navigateTo} />)
                        ) : (
                            <p className="text-gray-500">No best sellers found.</p>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Latest Reviews</h2>
                    </div>
                    <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                        {mockReviews.map(review => <ReviewCard key={review.id} review={review} navigateTo={navigateTo} />)}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Classics</h2>
                        <a href="#" className="text-sm font-semibold text-primary-accent hover:underline">View All</a>
                    </div>
                    <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                        {classics.length > 0 ? (
                            classics.map(book => <BookCard key={book.id} book={book} navigateTo={navigateTo} />)
                        ) : (
                            <p className="text-gray-500">No classics found.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;