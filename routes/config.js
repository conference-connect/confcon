const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Config = require('../models/config');
// const token = require('../lib/token');

router
  .get('/', bodyParser, (req, res, next) => {

  });

module.exports = router;
