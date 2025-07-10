// --- src/pages/BestSellerPage.js ---
import { mockBooks } from '../data/mockData';
import { ChevronLeftIcon } from '../components/icons';
import BookCard from '../components/BookCard';

const BestSellerPage = ({ navigateTo }) => { const bestSellers = mockBooks.filter(b => b.category === 'Best Seller'); return (<div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8"><div className="flex items-center mb-8"><button onClick={() => navigateTo('home')} className="p-2 rounded-full hover:bg-gray-100 mr-2"><ChevronLeftIcon className="w-6 h-6 text-gray-600" /></button><h1 className="text-3xl font-bold text-gray-800">Best Seller</h1></div><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">{bestSellers.map(book => (<div key={book.id} className="w-full"><BookCard book={book} navigateTo={navigateTo} /></div>))}</div></div>); };
export default BestSellerPage;