const router = require('express').Router();
const User = require('../models/user');
const ensureRole = require('../lib/ensureRole');
const bodyParser = require('body-parser').json();

router
  .post('/:userId/roles/:role', ensureRole('admin'), (req, res, next) => {
    User.findById(req.params.userId)
      .then( user => {
        if (!user) {
          next({code: 500, error: 'Authorization Failed'});
        }

        const role = req.params.role;
        if (user.roles.indexOf(role) > -1) {
          return user;
        } else {
          user.roles.push(role);
          return user.save();
        }
      })
      .then(user => {
        res.json({
          id: user.id,
          roles: user.roles
        });
      })
      .catch(err => {
        next({
          code: 500,
          msg: 'unable to add user role',
          error: err
        });
      });
  })

  .get('/list', ensureRole('admin'), (req, res, next) => {
    User.find()
    .then( users => {
      res.json(users.map( el =>{
        return {
          id: el['_id'],
          username: el.username,
          roles: el.roles,
          organization: el.organization};
      }));
    })
    .catch( err => {
      next({code: 500,
        msg: 'unable to return users',
        error: err
      });
    });
  })

  .get('/:id', (req, res, next) =>{
    User.findById(req.params.id)
    .lean()
    .then(result => {
      delete result.password;
      if(result._id != req.user.id && req.user.roles.indexOf('admin') === -1 ){
        if(result.hidden.email && result.profile_email) delete result.profile_email;
        if(result.hidden.twitter && result.profile_twitter) delete result.profile_twitter;
        delete result.agenda;
        delete result.roles;
      }

      return result;
    })
    .then(publicUser => res.json(publicUser))
    .catch(err => {
      next({
        code: 400,
        msg: 'user not found',
        error: err
      });
    });
  })

  // .patch('/:id', bodyParser, ensureRole('admin'), (req, res, next) => {
  //   User.findOneAndUpdate({_id: req.params.id} , req.body, {new: true})
  //   .then(userItem => {
  //     res.json(userItem);
  //   })
  //   .catch( () => {
  //     next({code: 500, error: 'Unable to update user'});
  //   });
  // })

  .patch('/:id', bodyParser, (req, res, next) => {
    if (req.params.id) {
      User.findById(req.params.id)
        .then(result => {
          if (result) {
            if (req.body.password) {
              const password = req.body.password;
              delete req.body.password;
              result.generateHash(password);
            }
            Object.assign(result, req.body);
            result.save()
              .then(result => res.json(result))
              .catch(err => next(err));
          }
        });
    }
  })

  .delete('/:id', ensureRole('admin'), (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      next({
        code: 500,
        msg: 'unable to delete user',
        error: err
      });
    });

  });

module.exports = router;
