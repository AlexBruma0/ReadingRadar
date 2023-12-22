const Book = require('../models/Book');

async function createBook(title, author, rating, notes, img_url, category, ownerId, order) {
  const newBook = new Book({
    title,
    author,
    rating,
    notes,
    img_url,
    category,
    ownerId,
    order
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



async function deleteBook(bookId) {
  return Book.findByIdAndDelete(bookId);
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
  reorderBook
};