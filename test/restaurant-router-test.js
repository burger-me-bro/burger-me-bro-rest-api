'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const superagent = require('superagent');
const expect = require('expect');

require('./lib/aws-mock.js');
const mockRestaurant = require('./lib/mock-restaurant.js');
const mockBurger = require('./lib/mock-burger.js');

const cleanDB = require('./lib/clean-db.js');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;


describe('testing restaurant router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);
  let tempBurger, tempUser, tempRestaurant;

  describe('testing POST route', () => {
    it('should return 200', () => {
      return mockBurger.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;

          return superagent.post(`${API_URL}/api/restaurant`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .field('name', 'Burger')
            .field('location', 'Seattle, WA')
            .field('burger', `${tempBurger._id}`)
            .attach('image', `${__dirname}/assets/burger.jpg`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Burger');
          expect(res.body.location).toEqual('Seattle, WA');
          expect(res.body.burger[0]).toEqual(tempBurger._id);
          expect(res.body.photo_url).toExist();
          expect(res.body._id).toExist();
        });
    });
  });
  it('should return a 400', () => {
    return superagent.post(`${API_URL}/api/restaurant`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });
  it('should return a 400 due to invalid burger id', () => {
    return superagent.post(`${API_URL}/api/restaurant`)
      .field('burger', 'not a valid id')
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });

  it('should return a 500 for a server error', () => {
    return mockRestaurant.createOne()
      .then(userData => {
        return superagent.post(`${API_URL}/api/restaurant`)
          .set('Authorization', `Bearer ${userData.token}`);
      })
      .catch(res => {
        expect(res.status).toEqual(500);
      });
  });


  describe('testing GET route', () => {
    it('should return a 200', () => {
      return mockRestaurant.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempRestaurant = res.restaurant;
          return superagent.get(`${API_URL}/api/restaurant/${tempRestaurant._id.toString()}`);

        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.userID).toEqual(tempUser.user._id);
          expect(res.body.burger[0]).toEqual(tempBurger._id);
        });
    });
  });

  describe('testing PUT route ', () => {
    let tempName = 'The Happy Burger Place';
    it('should return a 200', () => {
      return mockRestaurant.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempRestaurant = res.restaurant;
          return superagent.put(`${API_URL}/api/restaurant/${tempRestaurant._id.toString()}`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({ 'name': tempName });
        })
        .then(result => {
          expect(result.status).toEqual(200);
          expect(result.body._id).toExist();
          expect(result.body.name).toEqual(tempName);
          expect(result.body.userID).toEqual(tempUser.user._id);
          expect(result.body.burger[0]).toEqual(tempBurger._id);
        });
    });
  });

  describe('testing DELETE route', () => {
    it('should respond with a 204', () => {
      return mockRestaurant.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempRestaurant = res.restaurant;
          return superagent.get(`${API_URL}/api/burgers/${tempBurger._id.toString()}`);
        })
        .then(result => {
          expect(result.status).toEqual(200);
          expect(result.body.restaurant).toInclude(tempRestaurant._id);
        })
        .then(() => {
          return superagent.delete(`${API_URL}/api/restaurant/${tempRestaurant._id.toString()}`)
            .set('Authorization', `Bearer ${tempUser.token}`);
        });
    });
  });
});
