const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new book
router.post('/create', authMiddleware.authenticateToken, async (req, res) => {
  const { title, author, rating, notes, img_url, category } = req.body;
  const ownerId = req.user.userId;

  try {
    const newBook = await bookController.createBook(
      title,
      author,
      rating,
      notes,
      img_url,
      category,
      ownerId
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

// Update a book
router.put('/:id', authMiddleware.authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, notes, img_url, category } = req.body;
  const ownerId = req.user.userId;

  const updatedFields = {
    title,
    author,
    rating,
    notes,
    img_url,
    category,
    ownerId,
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
