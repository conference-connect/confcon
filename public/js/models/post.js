(function(module){
  //Post constructor
  function Post(obj){
    Object.keys(obj).forEach((item)=> {
      this[item] = obj[item];
    }, this);
  }

  Post.prototype.toHtml = function(){



  };

  function retrieveAllPosts(callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({url:'/api/post/list', headers: {'token': tokenFromStorage}}, {method:'GET'})
    .done( data => {
      var newArray = data.map( (el) => {
        return new Post(el);
      });
      callback(newArray);
    })
    .fail( () => {
      console.log('failure to complete ajax call in retrieveAllPosts');
      callback([]);
    });
  }

  function makeNewPost(postData, callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({
      url:'/api/post/',
      type:'POST',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in makeNewPost');
      callback({});
    });
  }

  function editPost(postID, postData, callback){
    const tokenFromStorage = localStorage.token;
    const updateUrl = `/api/post/${postID}`;
    $.ajax({
      url:updateUrl,
      type:'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in editPost');
      callback({});
    });
  }

  function deletePost(postID, callback){
    const tokenFromStorage = localStorage.token;
    const deleteUrl = `/api/post/${postID}`;
    $.ajax({
      url:deleteUrl,
      type:'DELETE',
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in deletePost');
      callback({});
    });
  }


  module.Post = Post;
  module.retrieveAllPosts = retrieveAllPosts;
  module.makeNewPost = makeNewPost;
  module.editPost = editPost;
  module.deletePost = deletePost;

})(window);
