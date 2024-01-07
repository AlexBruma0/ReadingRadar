const Comment = require('../models/CommentModel');

async function createComment(content, userId, bookId) {
  console.log("content: ",content)
  console.log("userId: ",userId)
  console.log("bookId: ",bookId)
  const newComment = new Comment({
    content,
    user: userId,
    book: bookId,
  });
  console.log("newComment: ",newComment)
  const savedComment = await newComment.save();
  console.log("savedComment: ",savedComment)
  return newComment.save();
}

async function getCommentsByBook(bookId) {
  return Comment.find({ book: bookId }).populate('user', 'userName');
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
