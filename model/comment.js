'use strict';

const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
  user_id: {type: mongoose.SchemaTypes.ObjectId, required:true},
  title: {type: String, required: true},
  content: {type:String, required: true, minLength:1},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('comment', commentSchema);