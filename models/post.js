const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    user: Schema.User.objectId,
    required: true
  },
  topics:{
    type: [Schema.Topic.objectId]
  },
  event: {
    type: Schema.Event.objectId
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
