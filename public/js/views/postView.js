(function (module){

  function renderTemplate(post){
    var template = Handlebars.compile($('#post-template').text());
    var htmlObject = template(post);

    return htmlObject;
  }


  function renderPage(){
    retrieveAllPosts(function(arrayOfPosts){
      console.log(arrayOfPosts);
      arrayOfPosts.forEach(function(post){

        $('#all-posts').append(renderTemplate(post));
      });
    });
  }

  module.renderPage = renderPage;
  module.renderTemplate = renderTemplate;
})(window);
