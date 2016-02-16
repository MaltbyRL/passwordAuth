'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

//POST /user/register
router.post('/register', function(req, res, next) {
  console.log('router, /register', req.body)

  User.register(req.body, function(err, user) {
    console.log('register')
    res.status(err ? 400 : 200).send(err || user)
  });
});


router.post('/login', function (req, res, next) {
  console.log("users req:", req)
  res.send({
    token: token
  });
});
module.exports = router;
