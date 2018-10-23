'use strict';

const express = require('express');
const Note = require('../models/note');
const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  let filter = {}
  const re = new RegExp(searchTerm, 'i')
  if (searchTerm) {
    filter.title = re;
  }
  Note.find(filter).sort({ updatedAt: 'desc' })
    .then((results) => {
      res.json(results)
    })
    .catch(err => {
      next(err)
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id)
    .then(result => {
      if (result) {
        res.json(result)
      }
      else {
        next()
      }
    })
    .catch(err => {
      next(err)
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  if (!req.body.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  const newNote = req.body;
  Note.create(newNote)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => {
      next(err)
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const updateObj = {}
  const id = req.params.id;

  const updateableFields = ['title', 'content'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  Note.findByIdAndUpdate(id, { $set: updateObj }, { new: true })
    .then(results => {
      if (results) {
        res.json(results);
      }
      else {
        next();
      }
    })
    .catch(err => {
      next(err)
    });


  // console.log('Update a Note');
  // res.json({ id: 1, title: 'Updated Temp 1' });

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndRemove(id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else { next() }
    })
    .catch(err => {
      next(err)
    });
});



module.exports = router;