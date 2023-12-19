const Book = require('../models/Book');

async function createBook(title, author, rating, notes, img_url, category, ownerId) {
  const newBook = new Book({
    title,
    author,
    rating,
    notes,
    img_url,
    category,
    ownerId,
  });
  return newBook.save();
}

async function getBooks(ownerId) {
  return Book.find({ ownerId: ownerId });
}

async function getBookById(bookId) {
  return Book.findById(bookId);
}

async function updateBook(bookId, updatedFields) {
  return Book.findByIdAndUpdate(bookId, updatedFields, { new: true });
}

async function deleteBook(bookId) {
  return Book.findByIdAndDelete(bookId);
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};