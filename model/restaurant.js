'use strict';

const mongoose = require('mongoose');
const Burger = require('../model/burger.js');

const restaurantSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, required: true, unique: true},
  location: {type: String, required: true},
  burger: [{type: mongoose.Schema.Types.ObjectId, ref: 'burger'}],
  photo_url: {type: String, required: true},
});

restaurantSchema.pre('save', function (next) {
  Burger.findById(this.burger)
    .then(burger =>{
      let setBurgerID = new Set(burger.restaurant);
      setBurgerID.add(this._id);
      burger.restaurant = Array.from(setBurgerID);
      return burger.save();
    })
    .then(() => next())
    .catch(() => next(new Error('validation failed to create restuarant because burger does not exist')));
});



restaurantSchema.post('remove', function(doc,next){

  Burger.findById(doc.burger)
    .then(burger => {
      console.log(burger);
      burger.restaurant = burger.restaurant.filter(restaurant => doc._id.toString() !== restaurant.toString());
      return burger.save();
    })
    .then(()=> next())
    .catch(next);
});



module.exports = mongoose.model('restaurant', restaurantSchema);
