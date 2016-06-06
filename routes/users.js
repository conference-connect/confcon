const router = require('express').Router();
const User = require('../models/user');
const ensureRole = require('../lib/ensureRole');

router
  .post('/:userId/roles/:role', ensureRole('admin'), (req, res, next) => {
    User.findById(req.params.userId)
      .then( user => {
        if (!user) {
          throw new Error ('invalid authentication');
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
  .get('/:id', (req, res, next) =>{
    User.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      next({
        code: 400,
        msg: 'user not found',
        error: err
      });
    });
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
