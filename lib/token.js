const jwt = require('jsonwebtoken');
const superSecret = process.env.APP_SECRET || '348ukljshlk783hkjhas7ugh786gbdfkjhswgekfyu34g';

module.exports = {
  sign (user) {
    return new Promise((resolve, reject) => {
      jwt.sign({
        id:user.id,
        roles: user.roles,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }, superSecret, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });

    });
  },

  verify(token) {
    if (!token) {
      return Promise.reject('No token provided!');
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, superSecret, (err, payload) => {
        if(err) return reject(err);
        resolve(payload);
      });
    });
  }
};
