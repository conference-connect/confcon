const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    user: Schema.Types.objectId,
    ref: 'User',
    required: true
  },
  topics:{
    type: [Schema.Types.objectId],
    ref: 'Topic'
  },
  event: {
    type: Schema.Types.objectId,
    ref: 'Event'
  },
  link: {
    type: String
  },
  image: {
    type: Buffer
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
