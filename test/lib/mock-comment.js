'use strict';

const faker = require('faker');
const Comment = require('../../model/comment.js');
cosnt mockBurger = require('./mock-burger.js');

const mockComment = module.exports = {};

mockComment.createOne = () => {
  let res = {};
  let tempBurger, tempUser;

  return mockBurger.createOne()
    .then(result => {
      res.burger = result.burger;
      res.user = result.user;

      return new Comment({
        user_id: res.user._id.toString(),
        burger_id:res.burger._id.toString(),
        title: faker.random.words(4),
        content: faker.lorem.paragraph(5),
        date: new Date(),
      })
      .save()
    })
    .then(comment =>{
      res.comment = comment;
      return res;
    });
};
