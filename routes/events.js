const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Event = require('../models/event');
// const token = require('../lib/token');

router
  .get('/', bodyParser, (req, res, next) => {

  });

module.exports = router;
