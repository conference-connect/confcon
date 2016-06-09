(function(module){

  var userView = {
    renderUser(){
      //on link click
        //grab user id affiliated with that post's user
      $('.user-btn-handler').on('click','.post-author', function(e){
        e.preventDefault();
        var userId = $(this).attr('data');

        //retrieve user data
        var url = `/users/${userId}`;
        API.getOne(url, User, function(user){
          console.log(user);

          //populate user data onto modal window
          $('.modal-title').text(`${user.firstName} ${user.lastName}`);
          if(!user.organization){
            user.organization ='Organization Unknown';
          } else {
            $('.user-org').text(user.organization);
          }

          if(!user.profile_image){
            $('.user-img-container').html('<img src="./img/user-img-default.jpg">');
          } else {
            $('.user-img-container').html('<img src="' + user.profile_image +'">');
          }

          if(!user.profile_website || user.profile_website === undefined){
            $('.user-website').css('color', '#d3d3d3');
            $('.user-website').removeAttr('target href');
          } else {
            $('.user-website').css('color', '#00CDCD');
            $('.user-website').attr('href', `http://${user.profile_website}`).attr('target', 'blank');
          }

          if(!user.profile_email || user.profile_email === undefined){
            $('.user-email').css('color', '#d3d3d3');
            $('.user-email').removeAttr('target href');
          } else {
            $('.user-email').css('color', '#00CDCD');
            $('.user-email').attr('href', `mailto:${user.profile_email}`).attr('target', 'blank');
          }

          if(!user.profile_twitter || user.profile_twitter === undefined){
            $('.user-twitter').css('color', '#d3d3d3');
            $('.user-twitter').removeAttr('target href');
          } else {
            $('.user-twitter').css('color', '#00CDCD');
            $('.user-twitter').attr('href', `http://twitter.com/${user.profile_twitter}`).attr('target', 'blank');
          }
        });
      });
    },
    updateUser () {
      var form = document.getElementById('edit-profile');
      var edituser = form.elements;
      var input = document.getElementById('avatar');
      var reader = new FileReader();
      var formData = {
        firstName: edituser.firstName.value,
        lastName: edituser.lastName.value,
        organization: edituser.organization.value,
        profile_email: edituser.email.value,
        profile_description: edituser.description.value,
        profile_website: edituser.website.value.replace(/^https?\:\/\//i, ''),
        profile_twitter: edituser.twitter.value,
        hidden_email: edituser.hiddenemail.checked,
        hidden_twitter: edituser.hiddentwitter.checked
      };
      deleteEmptyProperties(formData, true);
      var userData = JSON.parse(localStorage.user);
      if (input.files[0]) {
        reader.onload = function(e) {
          formData.profile_image = e.target.result;
          API.patch('/users/'+userData.id, formData, User, function() {
            form.reset();
            alert('profile updated!');
          });
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        API.patch('/users/'+userData.id, formData, User, function() {
          form.reset();
          alert('profile updated!');
        });
      }
    },
    userId () {
      if (localStorage.user) {
        var data = JSON.parse(localStorage.user);
        return data.id;
      }
    }
  };


  function deleteEmptyProperties(obj, recurse) {
    var allEmpty = true;
    for (var i in obj) {
      if (obj[i] === '') {
        delete obj[i];
      } else {
        allEmpty = false;
        if (recurse && typeof obj[i] === 'object') {
          if (deleteEmptyProperties(obj[i], recurse)) delete obj[i];
        }
      }
    }
    return allEmpty;
  }



  $('#edit-profile-button').click(userView.updateUser);
  module.userView = userView;
})(window);
