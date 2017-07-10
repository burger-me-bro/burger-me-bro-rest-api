'use strict';

const faker = require('faker');
const mockUser = require('./mock-user.js');
const Burger = require('../../model/burger.js');

const mockBurger = module.exports = {};

mockBurger.createOne = () => {
  let result = {};
  return mockUser.createOne()
    .then(user => {
      result.user = user;
      return new Burger({
        name: faker.internet.userName(),
        rating: 'good',
        price: faker.random.number(),
        flavor_profile: 'sweet',
        description: faker.lorem.sentence(),
        photo_URL: faker.image.imageUrl(),
        veggie: false,
      })
        .save();
    })
    .then(burger => {
      result.burger = burger;
      return result;
    });
};
