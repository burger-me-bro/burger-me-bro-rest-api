'use strict';

const mongoose = require('mongoose');

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


module.exports = mongoose.model('burger', burgerSchema);
