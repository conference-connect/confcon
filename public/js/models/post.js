(function(module){
  //Post constructor
  function Post(obj){
    Object.keys(obj).forEach(function(item){
      this[item] = obj[item];
    }, this);
  }

  Post.prototype.toHtml = function(){
  };

  // Post.retrieveAll = function (callback){
  //   var tokenFromStorage = localStorage.token;
  //   $.ajax({url:'/api/post/list', headers: {'token': tokenFromStorage}}, {method:'GET'})
  //   .done(function(data){
  //     var newArray = data.map(function(el){
  //       return new Post(el);
  //     });
  //     callback(newArray);
  //   })
  //   .fail(function(){
  //     console.log('failure to complete ajax call in retrieveAllPosts');
  //     callback([]);
  //   });
  // };
  //
  // Post.makeNew = function(postData, callback){
  //   var tokenFromStorage = localStorage.token;
  //   $.ajax({
  //     url:'/api/post/',
  //     type:'POST',
  //     contentType: 'application/json',
  //     data: JSON.stringify(postData),
  //     headers: {'token': tokenFromStorage}})
  //   .done(function(data){
  //     var returnObject = new Post(data);
  //     callback(returnObject);
  //   })
  //   .fail(function(){
  //     console.log('failure to complete ajax in makeNewPost');
  //     callback({});
  //   });
  // };
  //
  // Post.edit = function(postID, postData, callback){
  //   var tokenFromStorage = localStorage.token;
  //   var updateUrl = `/api/post/${postID}`;
  //   $.ajax({
  //     url:updateUrl,
  //     type:'PATCH',
  //     contentType: 'application/json',
  //     data: JSON.stringify(postData),
  //     headers: {'token': tokenFromStorage}})
  //   .done(function(data){
  //     var returnObject = new Post(data);
  //     callback(returnObject);
  //   })
  //   .fail(function(){
  //     console.log('failure to complete ajax in editPost');
  //     callback({});
  //   });
  // };
  //
  // Post.delete = function(postID, callback){
  //   var tokenFromStorage = localStorage.token;
  //   var deleteUrl = `/api/post/${postID}`;
  //   $.ajax({
  //     url:deleteUrl,
  //     type:'DELETE',
  //     headers: {'token': tokenFromStorage}})
  //   .done(function(data){
  //     var returnObject = new Post(data);
  //     callback(returnObject);
  //   })
  //   .fail(function(){
  //     console.log('failure to complete ajax in deletePost');
  //     callback({});
  //   });
  // };

  module.Post = Post;

})(window);
