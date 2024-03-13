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

router.get('/searchbooks/:query', async (req, res) => {
  const queryString = req.params.query;

  try {
      const books = await bookController.searchGoogleBooks(queryString);
      if (!books || books.length === 0) {
          return res.status(404).json({ error: 'No books found for this query.' });
      }
      res.json(books);
  } catch (error) {
      res.status(500).json({ error: error.message});
  }
});

// Get a book by ID
router.get('/getbook/:id', async (req, res) => {
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


// reorder a book 
router.put('/reorder', authMiddleware.authenticateToken, async (req, res) => {
  const { currentOrder, newOrder, currentOrderId } = req.body;
  try {
    await bookController.reorderBook(currentOrder, newOrder, currentOrderId);
    res.status(200).json({ status: 'Books reorderd' });
  } catch (error) {
    res.status(500).json({ status: 'Error' });
  }
});

router.put('/move', authMiddleware.authenticateToken, async (req, res) => {
  const { currentOrder, newOrder, currentOrderId, currentCategory, newCategory } = req.body;

  try {
    const movedBook = await bookController.moveBookToNewCategory(currentOrder, newOrder, currentOrderId, currentCategory, newCategory);
    res.status(200).json({ success: 'Book moved successfully', book: movedBook });
  } catch (error) {
    res.status(500).json({ error: 'Error moving book to new category.' });
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


// Delete a book
router.delete('/:id', authMiddleware.authenticateToken, async (req, res) => {
  const bookId = req.params.id;

  try {
    await bookController.deleteBook(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
