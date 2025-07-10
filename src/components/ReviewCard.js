// --- src/components/ReviewCard.js ---

import { StarIcon } from './icons'; // adjust path if needed
import { mockBooks } from '../data/mockData'; // adjust path accordingly


const StarRating = ({ rating, className }) => (<div className={`flex items-center ${className}`}>{Array.from({ length: 5 }, (_, i) => (<StarIcon key={i} className="w-5 h-5" isFilled={i < rating} />))}</div>);
const ReviewCard = ({ review, navigateTo }) => { const book = mockBooks.find(b => b.id === review.bookId); if (!book) return null; return (<div className="flex-shrink-0 w-full sm:w-96 bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:-translate-y-1" onClick={() => navigateTo('bookDetails', { bookId: book.id })}><div className="flex items-center mb-4"><img src={`https://ui-avatars.com/api/?name=${review.reviewerName.replace(' ', '+')}&background=E0E7FF&color=6C63FF`} alt={review.reviewerName} className="w-12 h-12 rounded-full mr-4" /><div><h3 className="font-semibold text-gray-800">{review.reviewerName}</h3><StarRating rating={review.rating} /></div></div><p className="text-gray-600 italic">"{review.reviewText}"</p><div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-4"><img src={book.imageUrl} alt={book.title} className="w-12 h-16 object-cover rounded-md" /><div><h4 className="font-semibold text-sm text-gray-900">{book.title}</h4><p className="text-xs text-gray-500">{book.author}</p></div></div></div>); };
export default ReviewCard;