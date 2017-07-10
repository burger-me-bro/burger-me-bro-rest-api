'use strict';

const { Router } = require('express');

const Comment = require('../model/comment.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();

commentRouter.post('/api/comment', bearerAuth, (req, res, next) => {
  new Comment({
    user_id: req.user._id.toString(),
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
  });
});