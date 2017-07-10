'use strict'

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');

let API_URL = process.env.API_URL;

describe('testing server', () => {

  it('should return an error for server already running', () => {
    server.start();
    return superagent.post(`${API_URL}/api/signup`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });
  it('should return an error for server not running running', () => {
    server.stop();
    return superagent.post(`${API_URL}/api/signup`)
      .catch(err => {
        expect(err.code).toEqual('ECONNREFUSED');
        server.start();
      });
  });
});
