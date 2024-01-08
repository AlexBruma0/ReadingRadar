const Comment = require('../models/CommentModel');

async function createComment(content, userId, bookId) {
  const newComment = new Comment({
    content,
    user: userId,
    book: bookId,
  });
  return (await newComment.save()).populate('user');
}

async function getCommentsByBook(bookId) {
  return Comment.find({ book: bookId }).populate('user');
}

async function updateComment(commentId, updatedContent) {
  return Comment.findByIdAndUpdate(commentId, { content: updatedContent }, { new: true });
}

async function deleteComment(commentId) {
  return Comment.findByIdAndDelete(commentId);
}

module.exports = {
  createComment,
  getCommentsByBook,
  updateComment,
  deleteComment,
};
