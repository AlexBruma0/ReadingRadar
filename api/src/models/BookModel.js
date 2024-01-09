const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  notes: String,
  img_url: String,
  category: String,
  order: Number,
  sharedId: mongoose.Schema.Types.ObjectId, // new field
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timeAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);