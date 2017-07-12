'use strict';

const mongoose = require('mongoose');
const Comment = require('../model/comment.js');
const Restaurant = require('../model/restaurant.js');


const burgerSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  rating: {type:String, required:true, minlength:1, enum:['really bad','bad','average','good','really good']},
  price:{type:Number, required:true},
  flavor_profile: [{type:String, required:true, minlength:1, enum:['tangy','sweet','spicy','funky','crunchy','savory','greasy']}],
  description:{type:String, required:true, minlength:1},
  photo_URL: {type:String, required:true, minlength:1},
  veggie:{type:Boolean, required:true, minlength:1}, //this might just be veggie: Boolean, need to check once routes are created....
  restaurant: [{type: mongoose.Schema.Types.ObjectId, ref:'restaurant'}],
  comment: [{type: mongoose.Schema.Types.ObjectId, ref:'comment'}],
});


burgerSchema.pre('save', function (next) {
  if (this.restaurant.length != 0) {
    Restaurant.findById(this.restaurant)
      .then(restaurant =>{
        let setRestaurantId = new Set(restaurant.burger);
        setRestaurantId.add(this._id);
        restaurant.burger = Array.from(setRestaurantId);
        return restaurant.save();
      })
      .then(() => next())
      .catch(() => next(new Error('validation failed to create restuarant because burger does not exist')));
  }
  next();
});

burgerSchema.post('remove', function(doc,next){
  Restaurant.findById(doc.restaurant)
    .then(restaurant => {
      console.log('restaurant remove!!!!',restaurant);
      restaurant.burger = restaurant.burger.filter(burger => doc._id.toString() !== burger.toString());
      return restaurant.save();
    })
    .then(
      doc.comment.forEach(comment => {
        comment.remove();
      })
    )
    .then(()=> next())
    .catch(next);
});

module.exports = mongoose.model('burger', burgerSchema);
