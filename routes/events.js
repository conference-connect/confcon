const router = require('express').Router();
const Event = require('../models/event');
const ensureRole = require('../lib/ensureRole');
const bodyParser = require('body-parser').json();

function eventToReturn(eventData){
  return {
    id: eventData._id,
    title: eventData.title,
    date: eventData.date,
    speakers: eventData.speakers,
    topics: eventData.topics,
    location: eventData.location
  };
}

router
  .get('/list', (req, res, next) => {
    Event.find()
      .then( events => {
        if (!events){
          next({code: 404, error: 'No events found'});
        }
        res.json(events.map(el => {
          return eventToReturn(el);
        }));
      })
      .catch( () => {
        next({code: 500, error: 'Unable to fulfill request'});
      });
  })

  .get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
      .then(eventItem => {
        if (!eventItem){
          next({code: 404, error: 'Requested event not found'});
        }
        res.json(eventToReturn(eventItem));
      })
      .catch( () => {
        next({code: 500, error: 'Unable to fulfill request'});
      });
  })

  .post('/', bodyParser, ensureRole('admin'), (req, res, next) => {
    new Event(req.body).save()
      .then( eventItem => {
        res.json(eventToReturn(eventItem));
      })
      .catch( () => {
        next({code: 500, error: 'Unable to save event'});
      });
  })

  .patch('/:id', bodyParser, ensureRole('admin'), (req, res, next) => {
    Event.findOneAndUpdate({_id: req.params.id} , req.body, {new: true})
      .then(eventItem => {
        res.json(eventToReturn(eventItem));
      })
      .catch( () => {
        next({code: 500, error: 'Unable to update event'});
      });
  })

  .delete('/:id', ensureRole('admin'), (req, res, next) => {
    Event.findOneAndRemove({_id: req.params.id})
      .then(eventItem => {
        res.json(eventToReturn(eventItem));
      })
      .catch( () => {
        next({code: 500, error: 'Unable to delete event'});
      });
  });

module.exports = router;
