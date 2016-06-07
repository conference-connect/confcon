(function (module){

  function renderPage(){

    retrieveAllPosts(function(arrayOfPosts){
      console.log(arrayOfPosts);
    });

  }

  module.renderPage = renderPage;
})(window);
