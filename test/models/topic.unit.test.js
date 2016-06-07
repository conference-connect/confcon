const Topic = require('../../models/topic');

describe('Topic model', () => {
  it('requires name', done => {
    const topic = new Topic();
    topic.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const topic = new Topic({title: 'test'});
    topic.validate()
    .then(done)
    .catch(done);
  });

});
