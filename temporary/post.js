(function(module){
  //Post constructor
  function Post(obj){
    Object.keys(obj).forEach((item)=> {
      this[item] = obj[item];
    }, this);
  }

  Post.prototype.toHtml = function(){



  };

  const tokenForTesting = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NTVmOTIyNGY4ZjgxNmZhYzRhYTY3OSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTQ2NTI1MjU0OH0.EgUa-3c1YJdYJetW5q7WJC9galDbxxCVsqhjdSbI1iA';

  function retrieveAllPosts(callback){
    $.ajax({url:'/api/post/list', headers: {'token': tokenForTesting}}, {method:'GET'})
    .done( (data, message, xhr) => {
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

  function makeNewPost(){

  }

  function editPost(){

  }

  function deletePost(){


  }


  // retrieveAllPosts( (arrayOfPosts) => {
  //   console.log(arrayOfPosts);
  // });

  module.Post = Post;
  module.retrieveAllPosts = retrieveAllPosts;
  module.makeNewPost = makeNewPost;
  module.editPost = editPost;
  module.deletePost = deletePost;

})(window);
