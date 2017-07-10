'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('unauthorized no basic authorization provided'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('unauthorized no username or password provided'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('data and salt arguments required'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('unauthorized user does not exist'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('unauthorized unable to locate user in auth middleware'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);
  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);
  res.sendStatus(500);
};
