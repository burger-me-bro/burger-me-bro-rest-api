'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');


const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

let API_URL = process.env.API_URL;

describe('testing burger router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/burgers', () => {
    it('should return a 200', () => {
      let testUserData;
      return mockUser.createOne()
        .then(userData => {
          testUserData = userData;
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${testUserData.token}`)
            .field('name', 'test_burgerr')
            .field('rating', 'good')
            .field('price', 5)
            .field('flavor_profile', 'tangy')
            .field('description', 'so good!')
            .field('veggie', false)
            .attach('image', `${__dirname}/assets/burger.jpg`);
        })
        .then(res => {
          expect(res.body).toExist();
        });
    });
    it('should return a 400 for a bad request', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          console.log(testUser);
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${userData.token}`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

});
