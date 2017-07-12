'use strict';

const User = require('../../model/user.js');
const Burger = require('../../model/burger.js');
const Restaurant = require('../../model/restaurant.js');

module.exports = () =>{
  return Promise.all([
    User.remove({}),
    Burger.remove({}),
    Restaurant.remove({}),
  ]);
};
