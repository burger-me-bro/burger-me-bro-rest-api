'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');
const faker = require('faker');

const mockBurger = require('./lib/mock-burger.js');
const mockComment = require('./lib/mock-comment.js');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');

let API_URL = process.env.API_URL;


describe('testing comment router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);
  let tempBurger;
  let tempUser;
  describe('testing POST route', () => {
    it('should return a 200', () => {
      return mockBurger.createOne()
        .then(res => {   
          tempBurger = res.burger;
          tempUser = res.user;
          return superagent.post(`${API_URL}/api/comment`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .set('user_id', tempUser.user._id.toString())
            .set('burger_id', res.burger._id.toString())
            .set('title', 'This Burger is bae')
            .set('content', 'Let me tell you about this burger')
            .set('date', new Date())
            .then(res => {
              console.log(res);
              expect(res.status).toEqual(200);
              expect(res.body.title).toEqual('This Burger is bae');
              expect(res.body._id).toExist();
            });
        });
    });
  });

  describe('testing GET route',()=>{
    it('should return a 200', () =>{
      return moc
    });
  });
});