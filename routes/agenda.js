const router = require('express').Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

// this seems to be a recurring theme in your app of having to map everything
// just to recast _id to id. Would be better to modify your mongoose schema to just return what you want.

function mapEvents(event){
  return {
    id: event['_id'],
    title: event.title,
    date: event.date,
    speakers: event.speakers,
    topics: event.topics,
    location: event.location
  };
}

// maybe consolidate something like this:
function sendUserEvents( userPromise, res, next ) {
  userPromise.then( user => {
    const arrayOfEvents = user.agenda.map(mapEvents);
    res.json(arrayOfEvents);
  })
  .catch( () => {
    next({code: 404, error: 'Requested agenda not found'});
  });
}

router
.get('/:id', (req, res, next) => {
  sendUserEvents(
    User.findOne({_id: req.params.id})
    .select('agenda')
    .populate('agenda')
    .lean(),
    res, next);
}, sendUserEvents)

.patch('/:id', bodyParser, (req, res, next) => {
  sendUserEvents(
    User.findByIdAndUpdate(
      req.params.id,
      {$addToSet: {agenda: req.body.event_id}},
      {safe: true, new: true})
      .populate('agenda'),
    res, next);
})

.patch('/delete/:id', bodyParser, (req, res, next) => {
  sendUserEvents(
    User.findByIdAndUpdate(
      req.params.id,
      {$pull: {agenda: req.body.event_id}},
      {safe: true, new: true})
      .populate('agenda'),
    res, next);
});

module.exports = router;
