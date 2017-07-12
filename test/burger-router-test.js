'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');


const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');
const mockBurger = require('./lib/mock-burger.js');
const mockComment = require('./lib/mock-comment.js');
const Restaurant = require('../model/restaurant.js');
const faker = require('faker');
const Comment = require('../model/comment.js');

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
          expect(res.body.description).toEqual('so good!');
          expect(res.body.name).toEqual('test_burgerr');
        });
    });
    it('should return a 400 for a bad request', () => {
      return mockUser.createOne()
        .then(userData => {
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
          expect(res.status).toEqual(404);
        });
    });
  });







  describe('testing PUT /api/burgers', () => {
    it('should respond with the updated burger', () => {
      let tempBurger, tempUser;
      return mockBurger.createOne()
        .then(result => {
          tempBurger = result.burger;
          tempUser = result.user;
          return superagent.put(`${API_URL}/api/burgers/${tempBurger._id.toString()}`)
            .set('Authorization',  `Bearer ${tempUser.token}`)
            .send({'description':'updated'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.description).toEqual('updated');
        });
    });
    it('should send over a 404 error', () => {
      let tempBurger, tempUser;
      return mockBurger.createOne()
        .then(result => {
          tempBurger = result.burger;
          tempUser = result.user;

          return superagent.put(`${API_URL}/api/burgers/${tempBurger.description.toString()}`)
            .set('Authorization',  `Bearer ${tempUser.token}`)
            .send({'description':'updated'});
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing the Delete route', () => {
    it('should delete the burger put into the database...', () => {
      let tempBurger, tempUser;
      return mockBurger.createOne()
        .then(result => {
          tempBurger = result.burger;
          tempUser = result.user;
          return superagent.delete(`${API_URL}/api/burgers/${tempBurger._id.toString()}`)
            .set('Authorization',  `Bearer ${tempUser.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it.only('should delete the burger AND ALL comments associated with this burger', () => {
      let tempBurger, tempUser, tempComment, result;
      return mockBurger.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          return new Comment({
            user: res.user.user._id.toString(),
            burger: res.burger._id.toString(),
            title: faker.random.words(4),
            content: faker.lorem.paragraph(5),
            date: new Date(),
          }).save();
        })
        .then(res => {
          console.log(res);


          // return superagent.delete(`${API_URL}/api/burgers/${tempBurger._id.toString()}`)
          //   .set('Authorization',  `Bearer ${tempUser.token}`);
        });
        // .then(res => {
        //   console.log(res);
        //   expect(res.status).toEqual(204);
        // });
    });
  });


});
