// nice IIFE!
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
        profile_email: newuser.email.value,
        profile_description: newuser.description.value,
        profile_website: newuser.website.value.replace(/^https?\:\/\//i, ''),
        profile_twitter: newuser.twitter.value,
        hidden_email: newuser.hiddenemail.checked,
        hidden_twitter: newuser.hiddentwitter.checked
      };

      if (input.files[0]) {
        reader.onload = function(e) {
          formData.profile_image = e.target.result;
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
