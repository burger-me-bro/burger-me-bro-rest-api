'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');
const mockUser = require('./lib/mock-user.js');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');

let API_URL = process.env.API_URL;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/signup', () => {
    it('should respond with token', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'test_name',
          password: 'secret sauce',
          email: 'burgers4life@burgerme.com',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should return a 400 for a bad request', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({username: 1234})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with token', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          console.log(testUser);
          let encoded = new Buffer(`${testUser.username}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
