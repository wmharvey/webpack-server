const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2 days" });
}

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  User.find({username: req.body.username}).then( user => {
    if (user.length !== 0) {
      return res.status(400).send("A user with that username already exists");
    }
    bcrypt.hash( req.body.password, 8, function(err, hash) {
      var newUser = new User({
        username: req.body.username,
        password: hash
      });
      newUser.save().then( savedUser => {
        res.status(201).send({
          id_token: createToken({user_id: savedUser._id, username: savedUser.username})
        });
      });
    });
  });
});

router.post('/signin', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  User.find({username: req.body.username}).then( user => {
    if (user.length === 0) {
      return res.status(400).send("A user with that username doesn't exists");
    }
    bcrypt.compare(req.body.password, user[0].password, function(err, response) {
      if (!response) {
        return res.status(401).send("The password doesn't match");
      }
      res.status(201).send({
        id_token: createToken({user_id: user[0]._id, username: user[0].username})
      });
    });
  });

});

module.exports = router;
