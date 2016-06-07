(function (module){

  function renderTemplate(post){
    var template = Handlebars.compile($('#post-template').text());
    var htmlObject = template(post);

    return htmlObject;
  }

  function renderPage(){
    // $('#new-post').hide();
    // $('#events').hide();
    // $('#my-profile').hide();

    retrieveAllPosts(function(arrayOfPosts){
      console.log(arrayOfPosts);
      arrayOfPosts.forEach(function(post){

        $('#all-posts').append(renderTemplate(post));
      });
    });
  }



  //TODO add filter by topics
  //TODO
  //

  module.renderPage = renderPage;
  module.renderTemplate = renderTemplate;
})(window);
