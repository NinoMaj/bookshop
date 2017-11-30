"use strict"
const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

const booksModel = mongoose.model('Books', booksSchema);

module.exports = booksModel;
