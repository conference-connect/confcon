const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Topic = require('../models/topic');
// const token = require('../lib/token');

router
  .get('/', bodyParser, (req, res, next) => {
    const query = req.query.type;
    Topic.find(query)
      .select('title color')
      .lean()
      .then(results => res.json(results))
      .catch(err => next(err));
  })
  .post('/', bodyParser, (req, res, next) => {
    new Topic(req.body).save()
      .then(result => res.json(result))
      .catch(err => next(err));
  })
  .patch('/:id', bodyParser, (req, res, next) => {
    if (req.params.id) {
      Topic.findById(req.params.id)
        .then(result => {
          if (result) {
            new Topic(Object.assign(result, req.body)).save()
              .then(result => res.json(result))
              .catch(err => next(err));
          }
        });
    }

  })
  .delete('/:id', bodyParser, (req, res, next) => {
    Topic.findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch(err => next(err));
  });

module.exports = router;
