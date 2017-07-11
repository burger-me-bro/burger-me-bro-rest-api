'use strict';

const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  location: {type: String, required: true},
  burger: [{type: mongoose.Schema.Types.ObjectId, ref: 'burger'}],
  photo_url: {type: String, required: true},
});

module.exports = mongoose.model('restaurant', restaurantSchema);
