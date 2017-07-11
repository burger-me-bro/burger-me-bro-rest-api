'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });


const expect = require('expect');
const superagent = require('superagent');
const mockBurger = require('./lib/mock-burger.js');
const mockUser = require('./lib/mock-user.js');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
require('./lib/aws-mock.js');

let API_URL = process.env.API_URL;

describe('testing burger router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/burgers', () => {
    it('should return a 200', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          console.log(testUser);
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${userData.token}`)
            .field('name', 'test_burger')
            .field('rating', 'good')
            .field('price', 5)
            .field('flavor_profile', 'tangy')
            .field('description', 'so good!')
            .field('veggie', false)
            .attach('image', `${__dirname}/assets/burger.jpg`);
        })
        .then(res => {
          console.log(res);
          expect(res.body).toExist();
        });
    });
  });
});
