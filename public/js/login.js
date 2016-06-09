(function (module){

  var login = {
    setLocalStorage (data) {
      console.log(data);
      if(data && data.token) {
        localStorage.token = data.token;
        delete data.token;
        localStorage.user = JSON.stringify(data);
        window.location = '/';
      }
      else {
        $error.text(data ? data.msg :'');
      }
    },
    signin () {
      $error.text('');
      var formData = {
        username: existing.username.value,
        password: existing.password.value
      };
      API.post('/signin', formData, User, login.setLocalStorage);
    },
    signup () {
      $error.text('');
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
          twitter: newuser.twitter.value
        },
        hidden: {
          email: newuser.hiddenemail.checked,
          twitter: newuser.hiddentwitter.checked
        }
      };

      if (input.files[0]) {
        reader.onload = function(e) {
          formData.profile.image = e.target.result;
          API.post('/signup', formData, User, login.setLocalStorage);
        };
        reader.readAsDataURL(input.files[0]);
      } else API.post('/signup', formData, User, login.setLocalStorage);
    }
  };

  var existing = document.getElementById('existing-credentials').elements;
  var newuser = document.getElementById('new-credentials').elements;
  var $error = $('#error');
  var input = document.getElementById('avatar');
  var reader = new FileReader();

  $('#showNew').click(function() {
    $('#existing').hide().siblings().show();
  });

  $('#existing-button').click(login.signin);
  $('#new-button').click(login.signup);

  module.login = login;

})(window);
