const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  link: {
    type: String
  },
  image: {
    type: Buffer
  },
  topics: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  edit_history: {
    type: [Date]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
