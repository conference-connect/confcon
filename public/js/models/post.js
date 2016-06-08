(function(module){
  //Post constructor
  function Post(obj){
    Object.keys(obj).forEach(function(item){
      this[item] = obj[item];
    }, this);
  }


  // const tokenForTesting = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NTVmOTIyNGY4ZjgxNmZhYzRhYTY3OSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTQ2NTI1MjU0OH0.EgUa-3c1YJdYJetW5q7WJC9galDbxxCVsqhjdSbI1iA';
  Post.prototype.toHtml = function(){



  };

  Post.retrieveAll = function (callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({url:'/api/post/list', headers: {'token': tokenFromStorage}}, {method:'GET'})
    .done(function(data){
      var newArray = data.map(function(el){
        return new Post(el);
      });
      callback(newArray);
    })
    .fail(function(){
      console.log('failure to complete ajax call in retrieveAllPosts');
      callback([]);
    });
  };

  Post.makeNew = function(postData, callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({
      url:'/api/post/',
      type:'POST',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      headers: {'token': tokenFromStorage}})
    .done(function(data){
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail(function(){
      console.log('failure to complete ajax in makeNewPost');
      callback({});
    });
  };

  Post.edit = function(postID, postData, callback){
    const tokenFromStorage = localStorage.token;
    const updateUrl = `/api/post/${postID}`;
    $.ajax({
      url:updateUrl,
      type:'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      headers: {'token': tokenFromStorage}})
    .done(function(data){
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail(function(){
      console.log('failure to complete ajax in editPost');
      callback({});
    });
  };

  Post.delete = function(postID, callback){
    const tokenFromStorage = localStorage.token;
    const deleteUrl = `/api/post/${postID}`;
    $.ajax({
      url:deleteUrl,
      type:'DELETE',
      headers: {'token': tokenFromStorage}})
    .done(function(data){
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail(function(){
      console.log('failure to complete ajax in deletePost');
      callback({});
    });
  };

  module.Post = Post;

})(window);
