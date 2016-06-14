const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Post = require('../models/post');

router
  .get('/list', bodyParser, (req, res, next) => {
    Post.find()
      .populate('author', '_id username')
      .populate('topics')
      .populate('event')
      .lean()
      .then(results => {
        if (results.length > 0) res.json(results);
        else next({code: 404,error:'no posts found'});
      })

      // these can all just use:
      //.catch(next)
      .catch(err => next(err));
  })
  .get('/list/:perPage/:page', bodyParser, (req, res, next) => {
    const page = Math.max(0, req.params.page);
    Post.find()
      // nice use of paging!
      .populate('author', '_id username')
      .populate('topics')
      .populate('event')
      .lean()
      .sort({createdAt: -1})
      .limit(req.params.perPage)
      .skip(page * req.params.perPage)
      .then(results => {
        if (results.length > 0) res.json(results);
        else next({code: 404,error:'no posts found'});
      })

      .catch(err => next(err));
  })
  .get('/postcount', bodyParser, (req, res, next) => {
    Post.find()
      .then(results => {
        res.json(results.length);
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
      // avoid unnecessary nesting by leveraging promise chain...
      // consolidate common validation.
      Post.findById(req.params.id)
        .populate('author')
        // use semantic variable names when known
        .then(post => {
          validatePostEdit( post, req.user );
          return new Post(Object.assign(post, req.body)).save();
        })
        .then(post => res.json(post))
        .catch(next);
    } // or no response ???
  })
  .delete('/:id', bodyParser, (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        // now we can use same validation rules
        validatePostEdit( post, req.user );
        return Post.findByIdAndRemove(req.params.id);
      })
      .then(post => res.json(post))
      .catch(next);
  });

function validatePostEdit( post, user ) {
  if (!post) throw {code: 404,error:'post not found'};
  if (post.author._id !== user.id || user.roles.indexOf('admin') === -1) {
    throw {code: 403,error:'only post authors and admins may edit posts.'};
  }
}

module.exports = router;
