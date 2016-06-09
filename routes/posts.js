const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Post = require('../models/post');

router
  .get('/list', bodyParser, (req, res, next) => {
    Post.find({})
      .populate('author', '_id username')
      .populate('topics')
      .populate('event')
      .lean()
      .then(results => {
        if (results.length > 0) res.json(results);
        else next({code: 404,error:'no posts found'});
      })

      .catch(err => next(err));
  })
  .post('/', bodyParser, (req, res, next) => {
    new Post(req.body).save()
      .then(result => res.json(result))
      .catch(err => next(err));
  })
  .patch('/:id', bodyParser, (req, res, next) => {
    if (req.params.id) {
      Post.findById(req.params.id)
        .populate('author')
        .then(result => {
          if (result) {
            if ((result.author._id === req.user.id) || (req.user.roles.indexOf('admin') > -1)) {
              new Post(Object.assign(result, req.body)).save()
                .then(result => res.json(result))
                .catch(err => next(err));
            } else next({code: 403,error:'only post authors and admins may edit posts.'});
          } else next({code: 404,error:'post not found'});
        })
        .catch(err => next(err));
    }
  })
  .delete('/:id', bodyParser, (req, res, next) => {
    Post.findById(req.params.id)
      .then(result => {
        if (result) {
          if ((result.author._id === req.user.id) || (req.user.roles.indexOf('admin') > -1)) {
            Post.findByIdAndRemove(req.params.id)
              .then(result => res.json(result))
              .catch(err => next(err));
          } else next({code: 403,error:'only post authors and admins may delete posts.'});
        } else next({code: 404,error:'post not found'});
      })
      .catch(err => next(err));
  });

module.exports = router;
