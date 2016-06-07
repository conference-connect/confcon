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
    $.ajax({url:'/api/post/', headers: {'token': tokenFromStorage}}, {method:'POST', data: postData})
    .done( data => {
      var returnObject = new Post(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in makeNewPost');
      callback({});
    });
  }

  function editPost(){

  }

  function deletePost(){


  }


  module.Post = Post;
  module.retrieveAllPosts = retrieveAllPosts;
  module.makeNewPost = makeNewPost;
  module.editPost = editPost;
  module.deletePost = deletePost;

})(window);
