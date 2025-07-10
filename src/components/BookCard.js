const BookCard = ({ book, navigateTo }) => (
  <div
    className="flex-shrink-0 w-48 sm:w-56 cursor-pointer group"
    onClick={() => navigateTo('bookDetails', { bookId: book.id })}
  >
    <div className="bg-[#F6F5FF] p-4 rounded-lg transition-shadow duration-300 group-hover:shadow-xl">
      <img
        src={book.imageUrl}
        alt={`Cover of ${book.title}`}
        className="w-full h-auto object-cover rounded-md shadow-md aspect-[2/3]"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/300x450/cccccc/ffffff?text=Image+Not+Found';
        }}
      />
    </div>
    <div className="mt-4 text-left">
      <h3 className="font-semibold text-gray-800 truncate">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>
      <p className="mt-2 font-bold text-[#6C63FF]">
        {book.price ? parseFloat(book.price).toFixed(2) : 'N/A'} $
      </p>
    </div>
  </div>
);

export default BookCard;
