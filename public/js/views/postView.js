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

      API.getAll('api/post/list', Post, function(arrayOfPosts){
        $('#all-posts').empty();
        arrayOfPosts.forEach(function(post){
          post.createdAt = moment(post.createdAt).format('HH:MM on MM-DD-YY');
          $('#all-posts').append(postView.renderTemplate(post));
          $(`#${post._id}`).on('click', (e)=>{
            e.preventDefault();
            API.delete ('/api/post/' + e.target.id, Post, postView.renderPage);
          });
        });
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
    API.post('api/post/', data, Post, postView.renderPage);
  });

  //TODO add filter by topics
  //TODO add user contact info


  module.postView = postView;
})(window);
