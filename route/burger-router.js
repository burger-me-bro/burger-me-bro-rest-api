'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Burger = require('../model/burger.js');
const bodyParser = require('body-parser').json();

const burgerRouter = module.exports = new Router();

burgerRouter.post('/api/burgers', bearerAuth, s3Upload('image'), (req,res, next) => {
  console.log('hit POST route for burger');
  new Burger({
    name: req.body.name,
    rating: req.body.rating,
    price: req.body.price,
    flavor_profile: req.body.flavor_profile,
    description: req.body.description,
    photo_URL: req.s3Data.Location,
    veggie: req.body.veggie,
  })
    .save()
    .then(burger => res.json(burger))
    .catch(next);
});


burgerRouter.get('/api/burgers/:id', (req, res, next) => {
  console.log('hit GET route for burger');
  Burger.findById(req.params.id)
    .then(burger => {
      res.json(burger);
    })
    .catch(next);
});

burgerRouter.put('/api/burgers/:id', bearerAuth, bodyParser, (req, res, next) => {
  console.log('hit PUT route for burger');
  let options = {
    runValidators: true,
    new: true,
  };
  Burger.findByIdAndUpdate(req.params.id, req.body, options)
    .then(burger => res.json(burger))
    .catch(next);
});


burgerRouter.delete('/api/burgers/:id', (req,res,next) => {
  console.log('hit DELETE route for burger');
  Burger.findById(req.params.id)
    .then(burger => burger.remove())
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
