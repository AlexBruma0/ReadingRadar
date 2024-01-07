const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/create', authMiddleware.authenticateToken, async (req, res) => {
  const { content, bookId } = req.body;
  console.log("req.user: ",req.user)
  const userId = req.user.userId;

  try {
    const newComment = await commentController.createComment(content, userId, bookId);
    console.log("newComment from controller: ",newComment)
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Could not create comment.' });
  }
});

// Get comments for a specific book
router.get('/book/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const comments = await commentController.getCommentsByBook(bookId);
    res.json(comments);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error fetching comments.' });
  }
});

// Update a comment
router.put('/:commentId', authMiddleware.authenticateToken, async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;

  try {
    const updatedComment = await commentController.updateComment(commentId, content);
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment.' });
  }
});

// Delete a comment
router.delete('/:commentId', authMiddleware.authenticateToken, async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const deletedComment = await commentController.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment.' });
  }
});

module.exports = router;
