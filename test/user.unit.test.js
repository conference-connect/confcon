const User = require('../models/user');

describe('User model', () => {
  it('requires name', done => {
    const user = new User();
    user.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const user = new User({username: 'fred', password: 'test', firstName: 'Fred', lastName: 'Jones'});
    user.validate()
    .then(done)
    .catch(done);
  });

});
