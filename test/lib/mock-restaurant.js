'use strict';

const faker = require('faker');
const mockBurger = require('./mock-burger.js');
const Restaurant = require('../../model/restaurant.js');

const mockRestaurant = module.exports = {};

mockRestaurant.createOne = () => {
  let result = {};
  return mockBurger.createOne()
    .then(burger => {
      result.burger = burger.burger;
      result.user = burger.user;
      return new Restaurant({
        userID: burger.user.user._id.toString(),
        name: faker.random.words(3),
        location: faker.address.city(),
        burger: burger.burger._id.toString(),
        photo_url: faker.image.imageUrl(),
      })
        .save();
    })
    .then(restaurant => {
      result.restaurant = restaurant;
      return result;
    });
};
