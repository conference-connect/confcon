const Post = require('../models/post');

describe('Post model', () => {
  it('requires title', done => {
    const post = new Post();
    post.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const post = new Post({body: 'test', author: '5755c38e5f9ef8c518745021'});
    post.validate()
    .then(done)
    .catch(done);
  });

});
