const tokenCheck = require('./token');

module.exports = function ensureAuth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return next({code:403, error: 'no token provided'});
  }

  tokenCheck.verify(token)
    .then(payload => {
      req.user = payload;
      next();
    })
    .catch(() => {
      next({code: 403, error: 'invalid token'});
    });
};
