const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Config = require('../models/config');
const ensureRole = require('../lib/ensureRole');
// const token = require('../lib/token');

function configToReturn(configData){
  return {
    config_id: configData.config_id,
    name: configData.name,
    year: configData.year,
    city: configData.city,
    description: configData.description,
    contact_email: configData.contact_email,
    contact_phone: configData.contact_phone,
    contact_address: configData.contact_address,
    posts_are_public: configData.posts_are_public
  };
}

router
  .get('/', bodyParser, (req, res, next) => {
    Config.findOne({config_id: 1}) //hard-coded id? just one conf :)
    .lean()
    .then( configData => {
      res.json(configToReturn(configData));
    })
    .catch( () => {
      next({code: 500, error: 'Server error, failed to send config file'});
    });
  })

  .patch('/', bodyParser, ensureRole('admin'), (req, res, next) => {
    Config.findOneAndUpdate({config_id: 1}, req.body, {new: true})
    .then(configData => {
      res.json(configToReturn(configData));
    })
    .catch( () => {
      next({code: 500, error: 'Server error, failed to update config file'});
    });
  })

  .post('/', bodyParser, ensureRole('admin'), (req, res, next) => {
    new Config(req.body).save()
    .then( configData => {
      res.json(configToReturn(configData));
    })
    .catch( () => {
      next({code: 500, error: 'Server error, failed to create config file'});
    });
  });

module.exports = router;
