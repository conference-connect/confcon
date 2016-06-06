const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../lib/token');

router
  .post('/signup', bodyParser, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    delete req.body.password;

    if (!password) {
      return res.status(400).json({
        msg: 'No password entered. Please enter a password!'
      });
    }

    User.findOne({username})
      .then( exists => {
        if (exists) {
          return res.status(500).json({
            msg: 'Unable to create username',
            reason: 'Username already exists.  Please choose another.'
          });
        }

        const user = new User(req.body);
        user.generateHash(password);
        return user.save()
          .then(user => token.sign(user))
          .then(token => res.json({token, id: user._id}));
      })
      .catch(err => {
        next({
          code: 500,
          msg: 'unable to create user',
          error: err
        });
      });
  })

  .post('/signin', bodyParser, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    delete req.body;
    User.findOne({username})
      .then(user => {
        if (!user || !user.compareHash(password)) {
          return res.status(400).json({msg: 'Authentication failed.'});
        }

        return token.sign(user);
      })
      .then(token => {
        console.log('got here');
        res.json({token});
      })
      .catch(next);
  });

module.exports = router;
