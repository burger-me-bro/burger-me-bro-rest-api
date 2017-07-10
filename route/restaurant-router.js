'use strict';

const Restaurant = require('../model/restaurant.js');
const Router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();

Router.post('/api/restaurant', bodyParser, (req, res, next) => {
  new Restaurant(req.body)
    .save()
    .then(restaurant => res.json(restaurant))
    .catch(next);
});

Router.get('/api/restaruant/:id', bodyParser, (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaruant => res.json(restaruant))
    .catch(next);
});

Router.put('/api/restaruant/:id', bodyParser, (req, res, next) => {
  let options = {
    runValidators: true,
    new: true,
  };
  Restaurant.findByIdAndUpdate(req.params.id, req.body, options)
    .then(restaurant => res.json(restaurant))
    .catch(next);
});

Router.delete('/api/restaruant/:id', bodyParser, (req, res, next) => {
  Restaurant.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
