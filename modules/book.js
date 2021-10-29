const mongoose = require('mongoose');
require('dotenv').config();



const bookSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  email: { type: String }
});

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;