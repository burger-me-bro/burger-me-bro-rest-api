'use strict';

const faker = require('faker');
const mockBurger = require('./mock-burger.js');
const Restaurant = require('../../model/restaurant.js');

const mockRestaurant = module.exports = {};

mockRestaurant.creatOne = function(n){
  let result = {};
  return mockBurger.creatOne()
    .then(burger => {
      result.burger = burger;
      return new Restaurant({
        name: faker.random.words(3),
        location: faker.address.city(),
        burger: burger._id.toString(),
        photo_url: faker.image.imageUrl(),
      })
        .save();
    })
    .then(restaurant => {
      result.restaurant = restaurant;
      return result;
    });
};
