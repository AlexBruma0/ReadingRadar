const mongoose = require('mongoose');

const books_storageSchema = new mongoose.Schema({
  title: String,
  author: String,
  img_url: String,
},{ collection: 'books_storage' });

module.exports = mongoose.model('Books_storage', books_storageSchema);