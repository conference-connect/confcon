const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../lib/token');
const ensureAuth = require('../lib/ensureAuth');

router
  .get('/validate', ensureAuth, (req,res) => {
    res.json({
      valid: true,
      admin: req.user.roles.indexOf('admin') > -1
    });
    // (unless you only wanted to add .admin prop if they are admin...)
  })
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
      .count()
      .then( count => {
        if (count) {
          return res.status(500).json({
            msg: 'Unable to create username',
            reason: 'Username already exists.  Please choose another.'
          });
        }

        const user = new User(req.body);
        user.generateHash(password);
        return user.save()
          .then(user => token.sign(user))
          .then(token => res.json({token, id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName}));
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

        return token.sign(user)
          .then(token => res.json({token, id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName}));
      })
      .catch(next);
  });

module.exports = router;
