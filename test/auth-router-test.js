'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');
const mockUser = require('./lib/mock-user.js');

require('./lib/aws-mock.js');
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
          expect(res.body).toExist();
          expect(res.text).toExist();
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
          let encoded = new Buffer(`${testUser.username}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with undefined if no header is provided', () => {
      return mockUser.createOne()
        .then(userData => {
          userData.user;
          return superagent.get(`${API_URL}/api/login`);
        })
        .catch(res => {
          expect(res.header).toEqual(undefined);
        });
    });
    it('should respond with no authorization provided', () => {
      return mockUser.createOne()
        .then(userData => {
          userData.user;
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400 for no username or pass provided', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          let encoded = new Buffer(`:${testUser.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400, username does not exist', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          let encoded = new Buffer(`${testUser.badusername}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400 for cannot find user in auth middleware', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          let encoded = new Buffer(`${testUser.username}:${userData}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return no bearer auth provided', () => {
      let testUser;
      return mockUser.createOne()
        .then(userData => {
          testUser = userData.user;
          console.log(testUser);
          return superagent.post(`${API_URL}/api/burgers`)
            .set('Authorization',  `Bearer`);
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
