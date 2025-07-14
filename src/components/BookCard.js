import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, navigateTo }) => {
  const { id, title, author, price, imageUrl } = book;

  return (
    <div
      className="flex-shrink-0 w-48 sm:w-56 cursor-pointer group"
      onClick={() => navigateTo('bookDetails', { bookId: id })}
    >
      <div className="bg-gray-100 p-4 rounded-lg transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={imageUrl || 'https://placehold.co/300x450/cccccc/ffffff?text=Image+Not+Found'}
          alt={`Cover of ${title}`}
          className="w-full h-auto object-cover rounded-md shadow-md aspect-[2/3]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x450/cccccc/ffffff?text=Image+Not+Found';
          }}
        />
      </div>
      <div className="mt-4 text-left">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>
        <p className="mt-2 font-bold text-indigo-600">
          {price ? `$${parseFloat(price).toFixed(2)}` : 'N/A'}
        </p>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default BookCard;
