'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });


const expect = require('expect');
const superagent = require('superagent');
const mockUser = require('./lib/mock-user.js');
const mockBurger = require('./lib/mock-burger.js')

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
      return mockBurger.createOne()
        .then(userData => {
          testUser = userData.user;
          console.log(testUser);
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer ${testUser.token}`)
            .field('name', 'test_burger');
        })
        .then(res => {
          console.log(res);
          expect(res.body).toExist();
        });
    });
  });
});
