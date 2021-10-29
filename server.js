'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());


const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');


const bookModel = require('./modules/book.js');
const seed = require('./modules/seed.js');

// const { response } = require('express');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', () => console.log('mongo database is connected!'));

mongoose.connect(process.env.MONGO_DATABASE_CONNECTION,
  // ${process.env.MONGO_DATABASE_CONNECTION}

  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) =>
  res.status(200).send('Server is running'));

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/seed', seed);

app.get('/books', getBook);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook)

async function getBook(req, res) {
  try {
    let bookRequest = {};
    if (req.query.status) {
      let { status } = req.query;
    }
    let books = await bookModel.find(bookRequest)  //<---get me everything in this collection. Theres something here, we need you to return it
    console.log(books)
    res.status(200).send(books);
  }
  catch (error) {
    res.status(500).send('cannot locate books form DB', error.message)
  }
}

async function postBook(request, response) {
  try {
    const bookInfo = request.body;
    // console.log('bookInfo ', bookInfo);
    const newBook = bookModel(bookInfo)
    // console.log(newBook);
    newBook.save();
    response.send(newBook)
  } catch (error) {
    console.log('error: ', error.message);
    response.status(400).send('Book not created')
  }
}

async function deleteBook(request, response) {
  let id = request.params.id
  try {
    await bookModel.findByIdAndDelete(id);
    response.send('Book deleted!')
  } catch (error) {
    response.status(400).send('Unable to delete book.')
  }
}


app.listen(PORT, () => console.log(`listening on ${PORT}`));

