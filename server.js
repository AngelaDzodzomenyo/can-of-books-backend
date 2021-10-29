'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());


const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

const bookModel = require('./modules/book');
const seed = require('./modules/seed.js');
// const { response } = require('express');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', () => console.log('mongo database is connected!'));

mongoose.connect(`${process.env.MONGO_DATABASE_CONNECTION}Book`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) =>
  res.status(200).send('Server is running'));

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/seed', seed);

app.get('/books', async (req, res) => {
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
});

app.post('/books', async (request, response) => {
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
})

app.delete('/books', async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let deletedObj = await bookModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  }
  catch (error) {
    res.status(500).send('error deleting book', error.message);
  }
})

app.get('*', (request, response) => {
  response.status(500).send('Page not found');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

