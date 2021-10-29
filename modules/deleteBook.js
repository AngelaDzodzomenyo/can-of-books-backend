'use strict'

const mongoose = require('mongoose');
require('dotenv').config();


async function deleteBook(request, response) {
  let id = request.params.id
  try {
    await bookModel.findByIdAndDelete(id);
    response.send('Book deleted!')
  } catch (error) {
    response.status(400).send('Unable to delete book.')
  }
}

  module.exports = deleteBook;
