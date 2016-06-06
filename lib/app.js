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

app.use('/api/topic', topics);
app.use('/api/post', posts);
app.use('/api/config', config);
app.use('/api/event', events);

app.use('/users', ensureAuth, ensureRole('admin'), users);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code||500).json({error: err.error || 'Server error'});
});

module.exports = app;
