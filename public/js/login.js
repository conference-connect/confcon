var request = superagent;

var existing = document.getElementById('existing-credentials').elements;
var newuser = document.getElementById('new-credentials').elements;
var $error = $('#error');

function getCredentials(type){
  if (type === 'signup')
    return {
      username: newuser.username.value,
      password: newuser.password.value,
      firstName: newuser.firstName.value,
      lastName: newuser.lastName.value,
      email: newuser.email.value
    };
  else return {
    username: existing.username.value,
    password: existing.password.value
  };
}

$('#showNew').on('click', function() {
  $('#existing').hide().siblings().show();
});

$('#existing-button').click( function() {
  login('signin');
});
$('#new-button').click( function() {
  login('signup');
});

function login(type){
  $error.text('');
  const cred = getCredentials(type);
  request.post('/' + type)
    .send(cred)
    .end(function(err,res){
      if(!err && res.body && res.body.token) {
        localStorage.token = res.body.token;
        window.location = '/';
      }
      else {
        $error.text(res.body ? res.body.msg : err);
      }
    });
}
