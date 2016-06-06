const router = require('express').Router();
const Event = require('../models/event');
const ensureRole = require('../lib/ensureRole');
const bodyParser = require('body-parser').json();

router
.get('/list', (req, res, next) => {
  Event.find()
  .then( events => {
    if (!events){
      next({code: 404, error: 'No events found'});
    }
    res.json(events);
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
    res.json(eventItem);
  })
  .catch( () => {
    next({code: 500, error: 'Unable to fulfill request'});
  });
})

.post('/', bodyParser, ensureRole('admin'), (req, res, next) => {
  new Event(req.body).save()
  .then( eventItem => {
    res.json(eventItem);
  })
  .catch( () => {
    next({code: 500, error: 'Unable to save event'});
  });
})

.patch('/', bodyParser, ensureRole('admin'), (req, res, next) => {
  Event.findOneAndUpdate({_id: req.body.id} , req.body, {new: true})
  .then(eventItem => {
    res.json(eventItem);
  })
  .catch( () => {
    next({code: 500, error: 'Unable to update event'});
  });
})

.delete('/:id', ensureRole('admin'), (req, res, next) => {
  Event.findOneAndRemove({_id: req.params.id})
  .then(eventItem => {
    res.json(eventItem);
  })
  .catch( () => {
    next({code: 500, error: 'Unable to delete event'});
  });
});

module.exports = router;
