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

          //populate user data onto modal window
          $('.modal-title').text(user.firstName + ' ' + user.lastName);
          
        });
      });




    }
  };

  module.userView = userView;
})(window);
