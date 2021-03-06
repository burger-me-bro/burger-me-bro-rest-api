'use strict';

const mongoose = require('mongoose');
const Burger = require('./burger.js');

const commentSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  burger:{type: mongoose.Schema.Types.ObjectId, ref:'burger'},
  title: {type: String, required: true},
  content: {type:String, required: true, minLength:1},
  date: {type: Date, required: true},
});

commentSchema.pre('save', function (next) {
  if(this.burger) {


    Burger.findById(this.burger)
      .then(burger =>{
        let setBurgerID = new Set(burger.comment);
        setBurgerID.add(this._id);
        burger.comment = Array.from(setBurgerID);
        return burger.save();
      })
      .then(() => next())
      .catch(() => next(new Error('validation failed to create comment because burger does not exist')));
  }
  next();
});

commentSchema.post('remove', function(doc,next){

  Burger.findById(doc.burger)
    .then(burger => {
      burger.comment = burger.comment.filter(comment => doc._id.toString() !== comment.toString());
      return burger.save();
    })
    .then(()=> next())
    .catch(next);
});

module.exports = mongoose.model('comment', commentSchema);
