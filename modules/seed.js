'use strict'

const mongoose = require('mongoose');
require('dotenv').config();

const bookModel = require('./book.js')

function seed(req, res) {
    const seedBooks = [{
        title: 'Breaking Dawn',
        description: 'Vampire stuff',
        status: true,
        email: 'abc123@gmail.com'
    },
    {
        title: 'PMP Exam Prep',
        description: 'PMP Stuff',
        status: true,
        email: 'abc123@gmail.com'
    }, {
        title: 'The Intelligent Investor',
        description: 'Investing',
        status: false,
        email: 'def456@gmail.com'
    }
    ]
    seedBooks.forEach(seed => {
        let entry = new bookModel(seed);
        console.log(entry);
        entry.save();
    })
    res.status(200).send('Seeded Database');
}

module.exports = seed;