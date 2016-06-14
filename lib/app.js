const express = require('express');
const app = express();

const ensureAuth = require('./ensureAuth');
const ensureRole = require('./ensureRole');

const users = require('../routes/users');
const auth = require('../routes/auth');
const topics = require('../routes/topics');
const posts = require('../routes/posts');
const config = require('../routes/config');
const events = require('../routes/events');
const agenda = require('../routes/agenda');

// const morgan = require('morgan');
// const fs = require('fs');
// const logStream = fs.createWriteStream(__dirname + '/../log/access.log', {flags: 'a'});
// app.use(morgan('combined', {stream: logStream}));

app.use('/', express.static('public'));

app.use('/', auth);

app.use('/users', ensureAuth, users);
app.use('/api/topic', ensureAuth, topics);
app.use('/api/post', ensureAuth, posts);
app.use('/api/config', ensureAuth, config);
app.use('/api/event', ensureAuth, events);
app.use('/api/agenda', ensureAuth, agenda);
app.use('/api/config', ensureAuth, ensureRole('admin'), config);

/* eslint no-unused-vars: "off" */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code||500).json({error: err.error || 'Server error', msg: err.msg});
});

module.exports = app;
