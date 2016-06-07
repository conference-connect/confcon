const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type:String
  },
  email_hidden: {
    type: Boolean,
    default: true
  },
  roles: {
    type:[String]
  },
  organization: {
    type:String
  },
  agenda:[{
    type:Schema.Types.ObjectId,
    ref: 'Event'
  }],
  profile_description:{
    type: String
  },
  profile_image:{
    type: Buffer
  },
  profile_website:{
    type: String
  },
  profile_twitter_username:{
    type:String
  },
  profile_twitter_hidden:{
    type: Boolean,
    default: true
  }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model ('User', userSchema);
