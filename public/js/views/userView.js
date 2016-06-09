(function(module){

  var userView = {
    renderUser(){
      //on link click
        //grab user id affiliated with that post's user
      $('.user-btn-handler').on('click','a', function(e){
        e.preventDefault();
        var userId = $(this).attr('data');

        //retrieve user data
        var url = `/users/${userId}`;
        API.getOne(url, User, function(user){
          console.log(user);
          if(!user.organization){
            user.organization ='Organization Unknown';
          }

          if(!user.profile){
            $('.user-img-container').html('<img src="./img/user-img-default.jpg">');
          }

          //populate user data onto modal window
          $('.modal-title').text(`${user.firstName} ${user.lastName}`);
          $('.user-org').text(user.organization);

          //TODO create better handling for hidden/unspecified contact info
          $('.user-website').attr('href', user.profile.website);
          $('.user-email').attr('href', user.profile.email);
          $('.user-twitter').attr('href', user.profile.twitter);

        });
      });
    },
    updateUser () {
      var edituser = document.getElementById('edit-profile').elements;
      var input = document.getElementById('avatar');
      var reader = new FileReader();
      var formData = {
        firstName: edituser.firstName.value,
        lastName: edituser.lastName.value,
        organization: edituser.organization.value,
        profile: {
          email: edituser.email.value,
          description: edituser.description.value,
          website: edituser.website.value,
          twitter: edituser.twitter.value
        },
        hidden: {
          // TODO set these as boolean values based on checkboxes.
          email: edituser.hiddenemail.checked,
          twitter: edituser.hiddentwitter.checked
        }
      };
      var userData = JSON.parse(localStorage.user);
      if (input.files[0]) {
        reader.onload = function(e) {
          formData.profile.image = e.target.result;
          API.patch('/users/'+userData.id, formData, User, function() {alert('profile updated!');});
        };
        reader.readAsDataURL(input.files[0]);
      } else API.patch('/users/'+userData.id, formData, User, function() {alert('profile updated!');} );
    }
  };

  $('#edit-profile-button').click(userView.updateUser);
  module.userView = userView;
})(window);
