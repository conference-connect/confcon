(function (module){

  var login = {
    apiCall (endpoint, data) {
      request.post(endpoint)
      .send(data)
      .end(function(err,res){
        if(!err && res.body && res.body.token) {
          localStorage.token = res.body.token;
          delete res.body.token;
          localStorage.user = JSON.stringify(res.body);
          window.location = '/';
        }
        else {
          $error.text(res.body ? res.body.msg : err);
        }
      });
    },
    signin () {
      $error.text('');
      var formData = {
        username: existing.username.value,
        password: existing.password.value
      };
      login.apiCall('/signin', formData);
    },
    signup () {
      $error.text('');
      reader.onload = function(e) {
        var formData = {
          username: newuser.username.value,
          password: newuser.password.value,
          firstName: newuser.firstName.value,
          lastName: newuser.lastName.value,
          organization: newuser.organization.value,
          profile: {
            email: newuser.email.value,
            description: newuser.description.value,
            website: newuser.website.value,
            twitter: newuser.twitter.value,
            image: e.target.result
          },
          hidden: {
            // TODO set these as boolean values based on checkboxes.
            email: newuser.hiddenemail.value === 'on',
            twitter: newuser.hiddentwitter.value === 'on'
          }
        };
        login.apiCall('/signup', formData);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  var request = superagent;

  var existing = document.getElementById('existing-credentials').elements;
  var newuser = document.getElementById('new-credentials').elements;
  var $error = $('#error');
  var input = document.getElementById('avatar');
  var reader = new FileReader();

  $('#showNew').on('click', function() {
    $('#existing').hide().siblings().show();
  });

  $('#existing-button').click(login.signin);
  $('#new-button').click(login.signup);



  module.login = login;

})(window);
