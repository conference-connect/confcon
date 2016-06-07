const Config = require('../models/config');

describe('config model', () => {
  it('requires name', done => {
    const config = new Config();
    config.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const config = new Config({name: 'test'});
    config.validate()
    .then(done)
    .catch(done);
  });

});
