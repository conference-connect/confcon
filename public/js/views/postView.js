(function (module){

  var postView = {
    renderTemplate (post) {
      var template = Handlebars.compile($('#post-template').text());
      var htmlObject = template(post);

      return htmlObject;
    },
    renderPage (){
      // $('#new-post').hide();
      // $('#events').hide();
      // $('#my-profile').hide();

      Post.retrieveAll(function(arrayOfPosts){
        console.log(arrayOfPosts);
        arrayOfPosts.forEach(function(post){

          $('#all-posts').append(postView.renderTemplate(post));
        });
      });

    }
  };



  //TODO add filter by topics
  //TODO
  //

  module.postView = postView;
})(window);
