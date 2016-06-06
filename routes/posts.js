const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Post = require('../models/post');
// const token = require('../lib/token');
const isAuth = require('../lib/ensureAuth');

router
  .get('/list', bodyParser, isAuth, (req, res, next) => {
    console.log(req.user);
    const query = req.query.type;
    Post.find(query)
      .select('body author topics event link image')
      .populate('author', '{username: , email}')
      .lean()
      .then(results => res.json(results))
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
        .then(result => {
          if (result) {
            new Post(Object.assign(result, req.body)).save()
              .then(result => res.json(result))
              .catch(err => next(err));
          }
        });
    }
  })
  .delete('/:id', bodyParser, (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => next(err));
  });

module.exports = router;
