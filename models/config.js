const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  city: {
    type: String
  },
  description: {
    type: String
  },
  contact_email: {
    type: String
  },
  contact_phone: {
    type: String
  },
  contact_address: {
    type: String
  },
  posts_are_public: {
    type: Boolean,
    default: false
  },
  config_id: {
    type: Number,
    required: true,
    unique: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Config', configSchema);
