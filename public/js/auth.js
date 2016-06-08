function getToken() {
  return new Promise(function (resolve, reject) {
    const token = localStorage.token;
    if (!token) reject('no token found');
    else {
      superagent
        .get('/validate')
				.set('token', token)
				.end(function(err) {
          if (err) reject('invalid token');
          else resolve(token);

				});
    }
  });
}

function validateToken (callback) {
  getToken()
    .then(callback, err => {
      console.log(err);
      localStorage.removeItem('token');
      window.location = 'login.html';
    });
}
