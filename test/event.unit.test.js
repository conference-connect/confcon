const Event = require('../models/event');

describe('Event model', () => {
  it('requires title', done => {
    const event = new Event();
    event.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const event = new Event({title: 'test', date: new Date()});
    event.validate()
    .then(done)
    .catch(done);
  });

});
