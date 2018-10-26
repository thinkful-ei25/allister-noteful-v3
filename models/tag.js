'use strict';

const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name : {type : String, required: true, unique: true}
});

tagSchema.set('timestamps', true);

const config = {
    virtuals: true,     // include built-in virtual `id`
    transform: (doc, result) => {
      // result.id = doc._id;
      delete result._id;
      delete result.__v;
    }
  };
  
  // Customize output for `res.json(data)`, `console.log(data)` etc.
  tagSchema.set('toObject', config);
  tagSchema.set('toJSON', config);

  module.exports = mongoose.model('Tag', tagSchema);
