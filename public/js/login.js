var request = superagent;

var form = document.getElementById( 'credentials' ).elements;
var error = document.getElementById( 'error' );

function getCredentials(){
  return {
    username: form.username.value,
    password: form.password.value
  };
}




function login( type ){
  error.textContent = '';

  const cred = getCredentials();
  request.post( '/auth/' + type )
    .send(cred)
    .end( function( err, res ){
      if( !err && res.body && res.body.token ) {
        localStorage.token = res.body.token;
        window.location = '/';
      }
      else {
        error.textContent = res.body ? res.body.error : err;
      }
    });
}
