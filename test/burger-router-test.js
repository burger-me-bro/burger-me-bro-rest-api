'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');


const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');
const mockBurger = require('./lib/mock-burger.js');

let API_URL = process.env.API_URL;

describe('testing burger router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);
  let tempBurger;

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
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${userData.token}`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return a 500 for a server error', () => {
      return mockBurger.createOne()
        .then(userData => {
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${userData.token}`);
        })
        .catch(res => {
          expect(res.status).toEqual(500);
        });
    });
  });
  describe('testing GET /api/burgers', () => {
    it('should return a 200, burger', () => {
      return mockBurger.createOne()
        .then(res => {
          tempBurger = res.burger;
          return superagent.get(`${API_URL}/api/burgers/${tempBurger._id.toString()}`);
        })
        .catch(res => {
          expect(res).toExist();
          expect(res.status).toEqual(200);
        });
    });
    it('should return a cast to object id, 404 error', () => {
      return mockBurger.createOne()
        .then(res => {
          tempBurger = res.burger;
          return superagent.get(`${API_URL}/api/burgers/${tempBurger.name.toString()}`);
        })
        .catch(res => {
          expect(res).toExist();
          expect(res.status).toEqual(404);
        });
    });
  });
});
