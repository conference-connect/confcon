(function (module){

  var postView = {
    renderTemplate (post) {
      var template = Handlebars.compile($('#post-template').text());
      var htmlObject = template(post);

      return htmlObject;
    },
    renderPage(){
      // $('#new-post').hide();
      // $('#events').hide();
      // $('#my-profile').hide();

      API.retrieveAll('api/post/list', Post, function(arrayOfPosts){
        console.log(arrayOfPosts);
        arrayOfPosts.forEach(function(post){
          $('#all-posts').append(postView.renderTemplate(post));
        });
        userView.renderUser();
      });
    },
    dom: {
      form: document.getElementById('new-post-form').elements
    }

  };

  $('#new-post-submit').click(function () {
    var user = JSON.parse(localStorage.user);
    var data = {
      body: postView.dom.form.postmsg.value,
      author: user.id
    };
    console.log(data);
    API.makeNew('api/post/', data, Post, postView.renderPage);
  });

  //TODO add filter by topics
  //TODO add user contact info


  module.postView = postView;
})(window);
