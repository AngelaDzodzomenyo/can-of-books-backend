'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const app = express();
app.use(cors());
const bookModel = require('./modules/book')

mongoose.connect('mongodb://localhost:27017/Book',
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

