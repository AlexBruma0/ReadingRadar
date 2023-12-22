const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  timeAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);