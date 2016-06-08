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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  profile: {
    email: {
      type:String
    },
    description:{
      type: String
    },
    image:{
      type: String
    },
    website:{
      type: String
    },
    twitter:{
      type:String
    }
  },
  hidden: {
    email: {
      type: Boolean,
      default: true
    },
    twitter: {
      type: Boolean,
      default: true
    }
  }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model ('User', userSchema);
