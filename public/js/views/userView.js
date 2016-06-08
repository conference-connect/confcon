(function(module){
  var userView = {
    renderUser(){
      User.getOne('5755f285c096bc9a20e91cff', function(user){
        console.log(user);
      });
    }
  };

  module.userView = userView;

})(window);
