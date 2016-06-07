(function (module){

  function renderPage(){

    const newPost = {body: 'funky time', author: '5755f9224f8f816fac4aa679'};
    makeNewPost(newPost, function(_){

      retrieveAllPosts(function(arrayOfPosts){
        console.log(arrayOfPosts);
      });
    });


  }

  module.renderPage = renderPage;
})(window);
