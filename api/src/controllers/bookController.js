const Book = require('../models/BookModel');
const mongoose = require('mongoose');
const  puppeteer = require("puppeteer-core");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function createBook(title, author, rating, notes, img_url, category, ownerId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  category = capitalizeFirstLetter(category);
  try {
    await Book.updateMany({category: category}, { $inc: { order: 1 } }, { session });
    const newBook = new Book({
      title,
      author,
      rating,
      notes,
      img_url,
      category,
      ownerId,
      order: 0 
    });

    const response = await newBook.save({ session });
    console.log('response', response)

    await session.commitTransaction();
    session.endSession();
    // console.log('added successfully')
    return newBook;
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
    const orderOfDeletedBook = bookToDelete.order;
    await Book.deleteOne({ _id: bookId }).session(session);
    await Book.updateMany({ order: { $gt: orderOfDeletedBook }, category: bookToDelete.category }, { $inc: { order: -1 } }).session(session);
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

async function fetchBooksFromAmazon(queryString){
  let browser;
  const auth = 'brd-customer-hl_14ee6362-zone-scraping_browser:1b7n382qvr2w'
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
    })

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    const encodedQuery = encodeURIComponent(queryString.replace(/\s/g, '+'));
    await page.goto(`https://www.amazon.ca/s?k=${encodedQuery}+book`);
    const elements = await page.$$('div[data-index="2"], div[data-index="3"], div[data-index="4"]');

    const booksDetails = await Promise.all(elements.map(async (element) => {
        return element.evaluate(node => {
            let title = node.querySelector('.a-size-base-plus')?.innerText || '';
            let authorElements = Array.from(node.querySelectorAll('.a-color-secondary .a-size-base'));
            let author = authorElements.length > 1 ? authorElements[1].innerText : '';
            let img_url = node.querySelector('.s-image')?.src || '';
            return { title, author, img_url };
        });
    }));

    return booksDetails;
  } catch (error) {
    console.log(error)
  }
  finally {
    await browser.close();
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteAllBooks,
  reorderBook,
  moveBookToNewCategory,
  fetchBooksFromAmazon
};