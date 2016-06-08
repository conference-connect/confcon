(function(module){

  function User(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  module.User = User;

})(window);
