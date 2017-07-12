'use strict';

const faker = require('faker');
const Comment = require('../../model/comment.js');
const mockBurger = require('./mock-burger.js');

const mockComment = module.exports = {};

mockComment.createOne = () => {
  let res = {};

  return mockBurger.createOne()
    .then(result => {
      res.burger = result.burger;
      res.user = result.user;
      return new Comment({
        user: res.user.user._id.toString(),
        burger: res.burger._id.toString(),
        title: faker.random.words(4),
        content: faker.lorem.paragraph(5),
        date: new Date(),
      }).save();
    })
    .then(comment => {
      res.comment = comment;
      return res;
    });
};
