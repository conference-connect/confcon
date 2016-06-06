const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.objectId,
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
  },
  edit_history: {
    type: [Date]
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
