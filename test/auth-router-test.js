'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');

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
          name: 'test_name',
          password: 'secret sauce',
          email: 'burgers4life@burgerme.com',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should return a 400 for a bad request', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({name: 1234})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
