const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');
// const mongoose = require('../lib/setup-mongoose');
// const tokenCheckker = require('../lib/token');

chai.use(chaiHttp);

describe('End-to-End REST API test', () => {

  const timeoutDuration = 10000;
  var request;

  before( done => {
    request = chai.request(app);
    done();
  });

  it('makes a connection', function(done) {
    this.timeout(timeoutDuration);
    request
    .post('/signup')
    .end( (err, res) => {
      assert.equal(JSON.parse(res.text).msg, 'No password entered. Please enter a password!');
      done();
    });

  });

  // thin on api tests!
  // Focus on golden path tests to hit major API endpoints.
  // In some ways, using POSTMAN can be a hinderance in that it makes
  // it easy to try endpoints, but no permanant artifact (a test) remains.
  // Next time, consider writing test rather than using POSTMAN - and use 
  // POSTMAN for quick exploration if outcome is unclear. 

});
