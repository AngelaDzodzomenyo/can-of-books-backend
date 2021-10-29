'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
app.use(cors());
const bookModel = require('./modules/book');
const seed = require('./modules/seed.js');
const { response } = require('express');
const db = mongoose.connection;
app.use(express.json());

db.on('error', console.error.bind(console, 'conection error: '));

db.once('open', () => console.log('mongo database is connected!'));

mongoose.connect('mongodb://localhost:27017/Book',
// ${process.env.MONGO_DATABASE_CONNECTION}
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) =>
  res.status(200).send('Server is running'));

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/seed', seed);

app.get('/books', async (req,res) => {
  let books = await bookModel.find({})  //<---get me everything in this collection. Theres something here, we need you to return it
  console.log(books)
  res.send(books)
});

app.post('/books', async (request,response) => {
  try {
    const bookInfo = request.body;
    const newBook = await bookModel.create(bookInfo)
    console.log(newBook);
    response.send(newBook)
  } catch(error) {
    response.status(400).send('Book not created')
  }
})


app.listen(PORT, () => console.log(`listening on ${PORT}`));

