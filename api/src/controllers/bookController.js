
const books_storage = require('../models/books_storageModel')
const Book = require('../models/BookModel');
const mongoose = require('mongoose');
const { google } = require('googleapis');
require('dotenv').config()

const books = google.books({
  version: 'v1',
  auth: process.env.GOOGLE_API_KEY
});

async function searchGoogleBooks(query) {
  try {
    const response = await books.volumes.list({
      q: query,
      maxResults: 1
    });

    if (response.data.items) {
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

const findBooksByTitle = async (titleQuery, limit = 4) => { 
  try {
      const regex = new RegExp(titleQuery, 'i'); // 'i' for case-insensitive
      const books = await books_storage.find({title: regex}).limit(limit);
      return books;
  } catch (error) {
      throw error;
  }
};

async function createBook(title, author, rating, notes, img_url, categories, ownerId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sharedId = new mongoose.Types.ObjectId(); 
    const newBooks = [];

    if (typeof categories === 'string') {
      categories = [categories];
    }
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
        sharedId 
      });

      const response = await newBook.save({ session });
      newBooks.push(newBook);
    }

    await session.commitTransaction();
    session.endSession();
    return newBooks;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
// async function getBooks(ownerId) {
//   return Book.find({ ownerId: ownerId });
// }
async function getBooks(ownerId, category, titleFilter, authorFilter, sortBy) {
  console.log("category", category,"title", titleFilter, "author", authorFilter, "sort", sortBy, "ownerId", ownerId);
  let query = { ownerId: ownerId };

  if (category !== 'undefined') {
    query.category = category;
  }

  if (titleFilter !== 'undefined') {
    query.title = { $regex: new RegExp(titleFilter, "i") };
  }

  if (authorFilter !==  'undefined') {
    query.author = { $regex: new RegExp(authorFilter, "i") };
  }

  let sortQuery = {};
  if (sortBy !== 'undefined') {
    if (sortBy === 'rating') {
      sortQuery[sortBy] = -1;
    } else {
      sortQuery[sortBy] = 1;
    }
  }
  // console.log("book controller: ", Book.find(query).sort(sortQuery));

  return Book.find(query).sort(sortQuery);
}

async function getBookById(bookId) {
  return Book.findById(bookId);
}

async function updateBook(bookId, updatedFields) {

  const bookToUpdate = await Book.findById(bookId);
  let updatedFieldsCopy = { ...updatedFields };
  delete updatedFieldsCopy.category;
  await Book.updateMany({ sharedId: bookToUpdate.sharedId }, updatedFieldsCopy);
  const updatedBook = await Book.findById(bookId);
  return updatedBook;
}

async function reorderBook(currentOrder, newOrder, currentOrderId) {
  try {

    if (newOrder < currentOrder) {
      const increaseOrderResult = await Book.updateMany(
        { order: { $gte: newOrder, $lt: currentOrder } },
        { $inc: { order: 1 } }
      );
    } else if (newOrder > currentOrder) {
      const decreaseOrderResult = await Book.updateMany(
        { order: { $gt: currentOrder, $lte: newOrder } },
        { $inc: { order: -1 } }
      );
    }

    const updateResult = await Book.updateOne({ _id: currentOrderId }, { order: newOrder });
  } catch (error) {
    throw error;
  }
}


const moveBookToNewCategory = async (currentOrder, newOrder, currentOrderId, currentCategory, newCategory) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    currentCategory = capitalizeFirstLetter(currentCategory);
    newCategory = capitalizeFirstLetter(newCategory);

    const bookToMove = await Book.findOne({ _id: currentOrderId, category: currentCategory }).session(session);

    if (!bookToMove) {
      throw new Error('Book not found');
    }

    await Book.updateMany(
      { category: currentCategory, order: { $gt: currentOrder } },
      { $inc: { order: -1 } },
      { session }
    );

    await Book.updateMany(
      { category: newCategory, order: { $gte: newOrder } },
      { $inc: { order: 1 } },
      { session }
    );

    bookToMove.order = newOrder;
    bookToMove.category = newCategory;
    await bookToMove.save({ session });
    await session.commitTransaction();
    session.endSession();
    return bookToMove;
  } catch (error) {
    await session.abortTransaction();

    session.endSession();
    throw error;
  }
};


async function deleteBook(bookId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookToDelete = await Book.findOne({ _id: bookId}).session(session)
    const sharedId = bookToDelete.sharedId;

    const booksToDelete = await Book.find({ sharedId: sharedId }).session(session);

    for (let book of booksToDelete) {
      await Book.updateMany({ order: { $gt: book.order }, category: book.category }, { $inc: { order: -1 } }).session(session);
    }

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
    return true;
  } catch (error) {
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
  findBooksByTitle,
  searchGoogleBooks
};