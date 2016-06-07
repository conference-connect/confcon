const router = require('express').Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

function mapEvents(el){
  return {
    id: el['_id'],
    title: el.title,
    date: el.date,
    speakers: el.speakers,
    topics: el.topics,
    location: el.location
  };
}

router
.get('/:id', (req, res, next) => {
  User.findOne({_id: req.params.id})
  .select('agenda')
  .populate('agenda')
  .then( user => {
    const arrayOfEvents = user.agenda.map(mapEvents);
    res.json(arrayOfEvents);
  })
  .catch( () => {
    next({code: 404, error: 'Requested agenda not found'});
  });
})

.patch('/', bodyParser, (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    {$addToSet: {agenda: req.body.event_id}},
    {safe: true, new: true})
    .populate('agenda')
    .then( user => {
      const arrayOfEvents = user.agenda.map(mapEvents);
      res.json(arrayOfEvents);
    })
    .catch( () => {
      next({code: 404, error: 'Requested agenda not found'});
    });
})

.delete('/', bodyParser, (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    {$pull: {agenda: req.body.event_id}},
    {safe: true, new: true})
    .populate('agenda')
    .then( user => {
      const arrayOfEvents = user.agenda.map(mapEvents);
      res.json(arrayOfEvents);
    })
    .catch( () => {
      next({code: 404, error: 'Requested agenda not found'});
    });
});

module.exports = router;
