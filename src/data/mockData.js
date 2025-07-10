// --- src/data/mockData.js ---
export const mockBooks = [
    { id: 1, title: 'Dune', author: 'Frank Herbert', price: 87.75, imageUrl: 'https://placehold.co/300x450/f2e9e4/4a4e69?text=Dune', category: 'Best Seller', summary: 'Dune is set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs. It tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis. The planet is an inhospitable and sparsely populated desert wasteland, yet it is the only source of melange, or "spice," a drug that extends life and enhances mental abilities.' },
    { id: 2, title: '1984', author: 'George Orwell', price: 35.75, imageUrl: 'https://placehold.co/300x450/22223b/ffffff?text=1984', category: 'Best Seller' },
    { id: 3, title: 'Ikigai', author: 'Hector Garcia', price: 36.00, imageUrl: 'https://placehold.co/300x450/ffffff/4a4e69?text=Ikigai', category: 'Best Seller' },
    { id: 4, title: 'Metafizik', author: 'Aristoteles', price: 36.00, imageUrl: 'https://placehold.co/300x450/4a4e69/ffffff?text=Metafizik', category: 'Best Seller' },
    { id: 5, title: 'Romeo and Juliet', author: 'William Shakespeare', price: 29.50, imageUrl: 'https://placehold.co/300x450/f2e9e4/4a4e69?text=Romeo+and+Juliet', category: 'Classics' },
    { id: 6, title: 'Bir Gece', author: 'Stefan Zweig', price: 25.00, imageUrl: 'https://placehold.co/300x450/003049/ffffff?text=Bir+Gece', category: 'Classics' },
];

export const mockReviews = [
    { id: 1, bookId: 1, reviewerName: 'Aisha Sharma', rating: 5, reviewText: 'An absolute masterpiece of science fiction. The world-building is second to none. A must-read for any fan of the genre.' },
    { id: 2, bookId: 2, reviewerName: 'Rohan Gupta', rating: 5, reviewText: 'A chilling and prophetic vision of the future. Orwell\'s classic is more relevant today than ever before. Haunting and brilliant.' },
    { id: 3, bookId: 3, reviewerName: 'Priya Singh', rating: 4, reviewText: 'A beautiful and simple guide to finding joy in everyday life. This book brought a sense of calm and purpose to my routine.' },
    { id: 4, bookId: 5, reviewerName: 'Vikram Kumar', rating: 5, reviewText: 'The timeless tale of love and tragedy. Shakespeare\'s prose is as powerful as ever. A story that resonates through the ages.' },
];

export const mockOrders = [
    { id: 'XN-12345', date: '2023-10-26', status: 'Delivered', total: 123.50, items: [mockBooks[0], mockBooks[1]] },
    { id: 'XN-67890', date: '2023-09-15', status: 'Delivered', total: 61.00, items: [mockBooks[2], mockBooks[4]] },
];