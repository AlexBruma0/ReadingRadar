const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(
    process.env.database_URL
  );

var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
})
const User = mongoose.model('User', userSchema)

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: Number,
    notes: String,
    img_url: String,
    catagory: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    timeAdded: { type: Date, default: Date.now }

})
const Book = new mongoose.model('Book', bookSchemaSchema)

const commentSchema = mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    timeAdded: { type: Date, default: Date.now }
})

const comment = mongoose.model('Comment', commentSchema)




