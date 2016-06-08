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




    }
  };

  module.userView = userView;
})(window);
