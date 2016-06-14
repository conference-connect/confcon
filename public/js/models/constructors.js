// these don't really do anything. Just stick with POJO's

(function(module){
  
  //don't use el unless you mean DOM element
  function Event(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    },this);
  }

  function Post(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  function User(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  function Topic(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  function Config(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }

  module.User = User;
  module.Post = Post;
  module.Event = Event;
  module.Topic = Topic;
  module.Config = Config;
})(window);
