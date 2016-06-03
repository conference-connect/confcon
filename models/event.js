const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  speakers: {
    type: [String]
  },
  date:{
    type:Date,
    required: true
  },
  topics: {
    type: [Schema.Topic.ObjectId]
  },
  maxAttendance: {
    type: Number
  },
  currentAttendance: {
    type: Number
  },
  location: {
    type: String
  }
});

module.exports = mongoose.model('Event', eventSchema);
