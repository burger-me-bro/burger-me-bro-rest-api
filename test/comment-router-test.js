'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');

const mockBurger = require('./lib/mock-burger.js');
const mockComment = require('./lib/mock-comment.js');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');

let API_URL = process.env.API_URL;


describe('testing comment router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);
  let tempBurger, tempUser, tempComment;

  describe('testing POST route', () => {
    it('should return a 200', () => {
      return mockBurger.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          return superagent.post(`${API_URL}/api/comment`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({
              'title': 'This Burger is bae',
              'content': 'Let me tell you about this burger',
              'burger': tempBurger._id,
            })
            .then(res => {
              tempComment = res.body;
              expect(res.status).toEqual(200);
              expect(res.body.title).toEqual('This Burger is bae');
              expect(res.body.burger).toEqual(tempBurger._id);
              expect(res.body._id).toExist();
              return superagent.get(`${API_URL}/api/burgers/${tempBurger._id}`)
            })
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body.comment).toInclude(tempComment._id);
            });
        });
    });

    it('should return a 400', () => {
      return superagent.post(`${API_URL}/api/comment`)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET route', () => {
    it('should return a 200', () => {
      return mockComment.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempComment = res.comment;
          return superagent.get(`${API_URL}/api/comment/${tempComment._id.toString()}`);
        })
        .then(result => {
          expect(result.status).toEqual(200);
          expect(result.body._id).toExist();
          expect(result.body.user).toEqual(tempUser.user._id);
          expect(result.body.burger).toEqual(tempBurger._id);
        });
    });
  });

  describe('testing PUT route ', () => {
    let tempTitle = 'The burger regime';
    it('should return a 200', () => {
      return mockComment.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempComment = res.comment;
          return superagent.put(`${API_URL}/api/comment/${tempComment._id.toString()}`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({ 'title': tempTitle });
        })
        .then(result => {
          expect(result.status).toEqual(200);
          expect(result.body._id).toExist();
          expect(result.body.title).toEqual(tempTitle);
          expect(result.body.user).toEqual(tempUser.user._id);
          expect(result.body.burger).toEqual(tempBurger._id);
        });
    });
  });

  describe('testing DELETE route', () => {
    it('should respond with a 204', () => {
      return mockComment.createOne()
        .then(res => {
          tempBurger = res.burger;
          tempUser = res.user;
          tempComment = res.comment;
          return superagent.get(`${API_URL}/api/comment/${tempComment._id.toString()}`);
        })
        .then(result => {
          expect(result.status).toEqual(200);
          expect(result.body).toExist();
        });
    });
  });
});