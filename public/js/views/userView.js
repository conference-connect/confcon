(function(module){
  var userView = {
    renderUser(){
      API.getOne('users/5755f285c096bc9a20e91cff', User, function(user){
        console.log(user);
      });
    }
  };

  module.userView = userView;

})(window);
