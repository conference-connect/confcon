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

function validateToken (callback) {
  getToken()
    .then(callback, err => {
      console.log(err);
      localStorage.removeItem('token');
      window.location = 'login.html';
    });
}

validateToken.shutuplint = true;
