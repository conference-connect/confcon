(function(module){
  //Post constructor
  function Post(obj){
    Object.keys(obj).forEach(function(item){
      this[item] = obj[item];
    }, this);
  }

  Post.prototype.toHtml = function(template){
    return template(this);
  };
  
  module.Post = Post;

})(window);
