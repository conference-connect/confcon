function getToken() {
  return new Promise(function (resolve, reject) {
    const token = localStorage.token;
    if (!token) {
      reject('no token found');
    } else {
      $.ajax({
        url: '/validate',
        type: 'GET',
        headers: {token: token}})
      .done(function(data) {
        resolve(data);
      })
      .fail(function() {
        reject('invalid token');
      });
    }
  });
}

// why not have validateToken return a Promise?
// try not to mix callback and Promises
function validateToken (callback) {
  getToken()
    .then(callback, function(err) {
      console.log(err);
      localStorage.removeItem('token');
      window.location = 'login.html';
    });
}
// use a file or inline comment ignore
validateToken.shutuplint = true;
