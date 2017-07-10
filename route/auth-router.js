'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');

const authRouter = module.exports = new Router();

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  User.create(req.body)
  .then(token => res.send(token))
  .catch(next);
});
