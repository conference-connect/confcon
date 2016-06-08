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
        API.retrieveOne(url, User, function(user){
          console.log(user);
        });
      });
      //populate user data onto a modal window solution
      $('.user-modal').on('shown.bs.modal', function () {
        $('#myInput').focus();
      });

    }
  };

  module.userView = userView;
})(window);
