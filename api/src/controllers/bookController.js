const books_storage = require('../models/books_storageModel')
const Book = require('../models/BookModel');
const mongoose = require('mongoose');
const { google } = require('googleapis');

const API_KEY = 'AIzaSyA_oV9aCPCHYSUIV75el2GynRjFmNEMTdI';

const books = google.books({
  version: 'v1',
  auth: API_KEY
});

// Function to search for a book
async function searchGoogleBooks(query) {
  try {
    const response = await books.volumes.list({
      q: query,
      maxResults: 1
    });

    if (response.data.items) {
      // Extract the information you need
      const book = response.data.items[0];
      const Book = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        img_url: book.volumeInfo.imageLinks.thumbnail
      }
    return Book;

    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error(error);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const findBooksByTitle = async (titleQuery, limit = 4) => { // default limit to 10
  try {
      const regex = new RegExp(titleQuery, 'i'); // 'i' for case-insensitive
      const books = await books_storage.find({title: regex}).limit(limit);
      return books;
  } catch (error) {
      console.error("Error finding books:", error);
      throw error;
  }
};

async function createBook(title, author, rating, notes, img_url, categories, ownerId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sharedId = new mongoose.Types.ObjectId(); // generate a new ObjectId
    const newBooks = [];
    for (let category of categories) {
      await Book.updateMany({category: category}, { $inc: { order: 1 } }, { session });
      const newBook = new Book({
        title,
        author,
        rating,
        notes,
        img_url,
        category,
        ownerId,
        order: 0,
        sharedId // assign the sharedId to the book
      });

      const response = await newBook.save({ session });
      console.log('response', response)
      newBooks.push(newBook);
    }

    await session.commitTransaction();
    session.endSession();
    return newBooks;
  } catch (error) {
    console.log(error.message)
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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

async function reorderBook(currentOrder, newOrder, currentOrderId) {
  try {

    if (newOrder < currentOrder) {
      const increaseOrderResult = await Book.updateMany(
        { order: { $gte: newOrder, $lt: currentOrder } },
        { $inc: { order: 1 } }
      );
      console.log('Books reordered successfully: Increased order.', increaseOrderResult);
    } else if (newOrder > currentOrder) {
      const decreaseOrderResult = await Book.updateMany(
        { order: { $gt: currentOrder, $lte: newOrder } },
        { $inc: { order: -1 } }
      );
      console.log('Books reordered successfully: Decreased order.', decreaseOrderResult);
    }

    const updateResult = await Book.updateOne({ _id: currentOrderId }, { order: newOrder });
    console.log('Book order update result:', updateResult);

  } catch (error) {
    console.error('Error reordering books:', error.message);
  }
}


const moveBookToNewCategory = async (currentOrder, newOrder, currentOrderId, currentCategory, newCategory) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    currentCategory = capitalizeFirstLetter(currentCategory);
    newCategory = capitalizeFirstLetter(newCategory);

    const bookToMove = await Book.findOne({ _id: currentOrderId, category: currentCategory }).session(session);
    console.log('Book fetched for moving:', bookToMove);

    if (!bookToMove) {
      throw new Error('Book not found');
    }

    await Book.updateMany(
      { category: currentCategory, order: { $gt: currentOrder } },
      { $inc: { order: -1 } },
      { session }
    );
    console.log('Decremented order of books in current category');

    await Book.updateMany(
      { category: newCategory, order: { $gte: newOrder } },
      { $inc: { order: 1 } },
      { session }
    );
    console.log('Incremented order of books in new category');

    bookToMove.order = newOrder;
    bookToMove.category = newCategory;
    await bookToMove.save({ session });
    console.log('Moved book to new category and order');

    await session.commitTransaction();
    console.log('Transaction committed');

    session.endSession();
    console.log('Session ended');

    return bookToMove;
  } catch (error) {
    console.log('Error occurred:', error);
    await session.abortTransaction();
    console.log('Transaction aborted');

    session.endSession();
    console.log('Session ended after error');

    throw error;
  }
};


async function deleteBook(bookId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookToDelete = await Book.findOne({ _id: bookId}).session(session)
    const sharedId = bookToDelete.sharedId;

    // Find all books with the same sharedId
    const booksToDelete = await Book.find({ sharedId: sharedId }).session(session);

    // For each book to be deleted, update the order of the remaining books in its category
    for (let book of booksToDelete) {
      await Book.updateMany({ order: { $gt: book.order }, category: book.category }, { $inc: { order: -1 } }).session(session);
    }

    // Delete all books with the same sharedId
    await Book.deleteMany({ sharedId: sharedId }).session(session);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

const deleteAllBooks = async (ownerId) => {
  try {
    await Book.deleteMany({ ownerId: ownerId });
    console.log("deletted all books")
    return true;
  } catch (error) {
    console.log('Error deleting all books:', error.message);
    throw error;
  }
};


module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteAllBooks,
  reorderBook,
  moveBookToNewCategory,
  fetchBooksFromAmazon,
  findBooksByTitle,
  searchGoogleBooks
};