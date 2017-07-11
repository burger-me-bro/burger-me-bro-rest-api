'use strict';

const faker = require('faker');
const mockUser = require('./mock-user.js');
const Burger = require('../../model/burger.js');

const mockBurger = module.exports = {};

mockBurger.randomBurgerProfile = () => {
  let flavors = ['tangy','sweet','spicy','funky','crunchy','savory','greasy'];
  return flavors[Math.floor(Math.random()*flavors.length)];
};

mockBurger.randomRating = () => {
  let ratings = ['really bad','bad','average','good','really good'];
  return ratings[Math.floor(Math.random()*ratings.length)];
};


mockBurger.randomPrice = () => {
  return Math.floor(Math.random()*20);
};



mockBurger.createOne = () => {
  let result = {};
  return mockUser.createOne()
    .then(user => {
      result.user = user;
      return new Burger({
        name: faker.internet.userName(),
        rating: mockBurger.randomRating(),
        price: mockBurger.randomPrice(),
        flavor_profile: mockBurger.randomBurgerProfile(),
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
