const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Topic = require('../models/topic');
// const token = require('../lib/token');

function topicToReturn(topicData){
  return {
    id: topicData._id,
    title: topicData.title,
    color: topicData.color
  };
}

router
  .get('/list', bodyParser, (req, res, next) => {
    Topic.find({})
      .select('title color')
      .lean()
      .then(results => res.json(results.map(e => topicToReturn(e))))
      .catch(err => next(err));
  })
  .post('/', bodyParser, (req, res, next) => {
    new Topic(req.body).save()
      .then(result => res.json(topicToReturn(result)))
      .catch(err => next(err));
  })
  .patch('/:id', bodyParser, (req, res, next) => {
    if (req.params.id) {
      Topic.findById(req.params.id)
        .then(result => {
          if (result) {
            new Topic(Object.assign(result, req.body)).save()
              .then(result => res.json(topicToReturn(result)))
              .catch(err => next(err));
          }
        });
    }

  })
  .delete('/:id', bodyParser, (req, res, next) => {
    Topic.findByIdAndRemove(req.params.id)
      .then(result => res.json(topicToReturn(result)))
      .catch(err => next(err));
  });

module.exports = router;
