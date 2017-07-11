'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const Comment = require('../model/comment.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();

commentRouter.post('/api/comment', bearerAuth, (req, res, next) => {
  return new Comment({
    user_id: req.user._id.toString(),
    title: req.headers.title,
    content: req.headers.content,
    date: new Date(),
  })
    .save()
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.get('/api/comment/:id', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.put('/api/comment/:id', bearerAuth, jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Comment.findByIdAndUpdate(req.params.id, req.body, options)
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.delete('/api/comment/:id', bearerAuth, (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});