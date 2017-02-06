var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var isAuthed = require('../middleware/auth').isAuthed;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Get users route ** auth
router.get('/api/users', isAuthed, function (err, res) {
  User.find().sort({'_id': -1}).exec(function(err, users) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(users);
  });
});

router.post('/api/user/register', isAuthed, function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('err', err);
      console.log('req', req.body);
      return res.status(400).send(err);
    }

    return res.status(200).send(user);
  });
});

router.post('/api/user/:id/delete', isAuthed, function(req, res) {
  User.findOne({'_id' : req.params.id }).remove().exec(function(err) {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send('success');
  });
});

router.post('/api/user/login', passport.authenticate('local'), function(req, res) {
  res.status(200).send('success');
});

router.get('/api/user/logout', isAuthed, function(req, res) {
  req.logout();
  res.status(200).send('success');
});

module.exports = router;
