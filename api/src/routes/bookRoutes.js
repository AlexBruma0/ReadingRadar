const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new book
router.post('/create', authMiddleware.authenticateToken, async (req, res) => {
  const { title, author, rating, notes, img_url, category, order } = req.body;
  const ownerId = req.user.userId;

  try {
    const newBook = await bookController.createBook(
      title,
      author,
      rating,
      notes,
      img_url,
      category,
      ownerId, 
      order
    );
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Could not create book.' });
  }
});

// Get all books
router.get('/:ownerId', async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const books = await bookController.getBooks(ownerId);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books.' });
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await bookController.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book.' });
  }
});
// reorder a book reorder
router.put('/reorder', authMiddleware.authenticateToken, async (req, res) => {
  const { currentOrder, newOrder, currentOrderId } = req.body;
  console.log(currentOrderId)
  try {
    await bookController.reorderBook(currentOrder, newOrder, currentOrderId);
    res.status(200).json({ success: 'Books reorderd' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error reordering books.' });
  }
});

// // Update a book
router.put('/:id', authMiddleware.authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, notes, img_url, category, order } = req.body.book;
  const ownerId = req.user.userId;

  const updatedFields = {
    title,
    author,
    rating,
    notes,
    img_url,
    category,
    ownerId,
    order
  };

  try {
    const updatedBook = await bookController.updateBook(bookId, updatedFields);
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book.' });
  }
});


// // Update all books
// router.put('/', async (req, res) => {
//   console.log("updating all")
//   const newBooks = req.body.books; // Array of new books
//   const ownerId = req.body.userId;

//   try {
//     // Step 1: Delete all existing books
//     await bookController.deleteAllBooks(ownerId);

//     // Step 2: Add each new book
//     const addedBooks = [];
//     for (const book of newBooks) {
//       try {
//         await bookController.createBook(
//           book.title,
//           book.author,
//           book.rating,
//           book.notes,
//           book.img_url,
//           book.category,
//           ownerId,
//           order
//         );
//         console.log("added book")
//       } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ error: 'Could not create book.' });
//       }
//     }
//     console.log("All books updated successfully")
//     res.json({ message: 'All books updated successfully' });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ error: 'Error updating books.' });
//   }
// });

// Delete a book
router.delete('/:id', authMiddleware.authenticateToken, async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await bookController.deleteBook(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book.' });
  }
});

module.exports = router;
