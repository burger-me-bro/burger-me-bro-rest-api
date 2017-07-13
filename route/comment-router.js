'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const Comment = require('../model/comment.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();

commentRouter.post('/api/comment', bearerAuth, jsonParser, (req, res, next) => {
  console.log('hit POST route for comment');
  new Comment({
    user: req.user._id.toString(),
    title: req.body.title,
    content: req.body.content,
    burger: req.body.burger,
    date: new Date(),
  })
    .save()
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.get('/api/comment/:id', (req, res, next) => {
  console.log('hit GET route for comment');
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.put('/api/comment/:id', bearerAuth, jsonParser, (req, res, next) => {
  console.log('hit PUT route for comment');
  let options = {
    new: true,
    runValidators: true,
  };
  Comment.findByIdAndUpdate(req.params.id, req.body, options)
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.delete('/api/comment/:id', bearerAuth, (req, res, next) => {
  console.log('hit DELETE route for comment');
  Comment.findById(req.params.id)
    .then(comment => comment.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
});
