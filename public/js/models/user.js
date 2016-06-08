(function(module){

  function User(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  User.getOne = function(userId, callback){
    const tokenFromStorage = localStorage.token;
    const Url = `api/users/${userId}`;
    $.ajax({url: Url, headers: {'token': tokenFromStorage}}, {method: 'GET'})
    .done(function(data){
      callback(data);
    })
    .fail(function(){
      console.log('failure to complete ajax call in getOneUser');
      callback([]);
    });
  };

  module.User = User;

})(window);
