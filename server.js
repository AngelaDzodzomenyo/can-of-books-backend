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
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'conection error: '));

db.once('open', () => console.log('mongo database is connected!'));

mongoose.connect('mongodb://localhost:27017/Book',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) =>
  res.status(200).send('Server is running'));

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/seed', seed);

app.get('/book', bookModel);



app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

