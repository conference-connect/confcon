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
  profile_email: {
    type:String
  },
  profile_description:{
    type: String
  },
  profile_image:{
    type: String
  },
  profile_website:{
    type: String
  },
  profile_twitter:{
    type:String
  },
  hidden_email: {
    type: Boolean,
    default: true
  },
  hidden_twitter: {
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
const User = module.exports = mongoose.model ('User', userSchema);

// create new Admin user if there are no users in the collection
const newAdmin = function() {
  const adminData = { username: 'Admin', firstName:'Admin', lastName: 'User', roles: ['admin']};
  const user = new User(adminData);
  user.generateHash('password');
  user.save();
};

User.find()
  .then(users => {
    if (users.length === 0) {
      newAdmin();
    }
  });
