const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

//find
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const searchTerm = 'government';
        let filter = {};


        const re = new RegExp(searchTerm, 'i')

        if (searchTerm) {
            filter = { $or: [{ title: re }, { content: re }] }
        }

        return Note.find(filter).sort({ updatedAt: 'desc' });
    })
    .then(results => {
        console.log(results);
    })
    .then(() => {
        return mongoose.disconnect()
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });

findById
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const id = '000000000000000000000004'
        return Note.findById(id).sort({ updatedAt: 'desc' });
    })
    .then(results => {
        console.log(results);
    })
    .then(() => {
        return mongoose.disconnect()
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });

//create
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const newNote = { "title": "5 things about coffee", "content": "Coffee Coffee Coffee Coffee Coffee" }
        return Note.create(newNote);
    })
    .then(results => {
        console.log(results);
    })
    .then(() => {
        return mongoose.disconnect()
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });

//update
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const updateObj = { "title": "I have updated this note", "content": "This note has been updated" }
        const id = '000000000000000000000003'
        return Note.findByIdAndUpdate(id, updateObj, { new: true })
            .then(results => {
                console.log(results);
            })
            .then(() => {
                return mongoose.disconnect()
            })
            .catch(err => {
                console.error(`ERROR: ${err.message}`);
                console.error(err);
            });
    })

//delete
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const id = '000000000000000000000004'
        return Note.findByIdAndRemove(id);
    })
    .then(results => {
        console.log(results);
    })
    .then(() => {
        return mongoose.disconnect()
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });


