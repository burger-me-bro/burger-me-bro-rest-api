'use strict';

const { Router } = require('express');
const Restaurant = require('../model/restaurant.js');

const bodyParser = require('body-parser').json();
const s3Upload = require('../lib/s3-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const restaurantRouter = module.exports = new Router();


restaurantRouter.post('/api/restaurant', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST route for restaurant');
  new Restaurant({
    userID: req.user._id.toString(),
    name: req.body.name,
    location: req.body.location,
    burger: req.body.burger,
    photo_url: req.s3Data.Location,
  })
    .save()
    .then(restaurant => res.json(restaurant))
    .catch(next);
});

restaurantRouter.get('/api/restaurant/:id', bodyParser, (req, res, next) => {
  console.log('hit GET route for restaruant');
  Restaurant.findById(req.params.id)
    .then(restaurant => res.json(restaurant))
    .catch(next);
});

restaurantRouter.put('/api/restaurant/:id', bodyParser, (req, res, next) => {
  console.log('hit PUT route for restaurant');
  let options = {
    runValidators: true,
    new: true,
  };
  Restaurant.findByIdAndUpdate(req.params.id, req.body, options)
    .then(restaurant => res.json(restaurant))
    .catch(next);
});

restaurantRouter.delete('/api/restaurant/:id', bodyParser, (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
});
