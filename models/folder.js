'use strict';
const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name : {type : String, required: true, unique: true}
});
// Add `createdAt` and `updatedAt` fields
folderSchema.set('timestamps', true);

const config = {
    virtuals: true,     // include built-in virtual `id`
    transform: (doc, result) => {
      // result.id = doc._id;
      delete result._id;
      delete result.__v;
    }
  };
  
  // Customize output for `res.json(data)`, `console.log(data)` etc.
  folderSchema.set('toObject', config);
  folderSchema.set('toJSON', config);

  module.exports = mongoose.model('Folder', folderSchema);
  