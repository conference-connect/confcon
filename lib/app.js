const express = require('express');
const app = express();
const morgan = require('morgan');


const users = require('../routes/users');
const auth = require('../routes/auth');
const ensureAuth = require('./ensureAuth');
const ensureRole = require('./ensureRole');
const topics = require('../routes/topics');
const posts = require('../routes/posts');
const config = require('../routes/config');
const events = require('../routes/events');

app.use(morgan('dev'));

app.use('/', express.static('public'));

app.use('/', auth);

app.use('/api/topic', ensureAuth, topics);
app.use('/api/post', ensureAuth, posts);
app.use('/api/config', ensureAuth, ensureRole('admin'), config);
app.use('/api/event', ensureAuth, events);

app.use('/users', ensureAuth, users);

app.use('/event', ensureAuth, events);

app.use((err, req, res, next) => {
  console.error(err);
  next.beQuiteLint = true;
  res.status(err.code||500).json({error: err.error || 'Server error'});
});

module.exports = app;
