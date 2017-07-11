'use strict';

const mongoose = require('mongoose');
const Burger = require('../model/burger.js');

const commentSchema = mongoose.Schema({
  user: {type: mongoose.SchemaTypes.ObjectId, required:true},
  burger:{type: mongoose.SchemaTypes.ObjectId, ref:'burger'},
  title: {type: String, required: true},
  content: {type:String, required: true, minLength:1},
  date: {type: Date, required: true},
});

// commentSchema.pre('save', function (next) { 
//   Burger.findById
// });

module.exports = mongoose.model('comment', commentSchema);

