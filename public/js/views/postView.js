(function (module){

  var postView = {
    renderPostTemplate (post) {
      var template = Handlebars.compile($('#post-template').text());
      var htmlObject = template(post);
      return htmlObject;
    },
    populateEventSelector () {
      var optionTag = '';
      postView.dom.$pse.empty();
      var template = Handlebars.compile($('#post-selector-template').text());
      API.getAll('api/event/list', Event, function(events) {
        events.forEach(function (e) {
          optionTag = template(e);
          postView.dom.$pse.append(optionTag);
        });
      });
    },

    renderPage(){
      // $('#new-post').hide();
      // $('#events').hide();
      // $('#my-profile').hide();

      API.getAll('api/post/list', Post, function(arrayOfPosts){
        $('#all-posts').empty();
        arrayOfPosts.forEach(function(post){
          post.createdAt = moment(post.createdAt).format('HH:mm on MM-DD-YY');
          $('#all-posts').append(postView.renderPostTemplate(post));
          $(`#${post._id}`).on('click', (e)=>{
            e.preventDefault();
            API.delete ('/api/post/' + e.target.id, Post, postView.renderPage);
          });
        });
        window.userView.renderUser();
      });
    },
    dom: {
      form: document.getElementById('new-post-form').elements,
      $pse: $('#postEventSelector')
    }

  };

  $('#new-post-submit').click(function () {
    var user = JSON.parse(localStorage.user);

    const arrayOfTopics = getSelectValues(postView.dom.form.newposttopics) || [];

    var data = {
      body: postView.dom.form.postmsg.value,
      author: user.id,
      topics: arrayOfTopics,
      event: postView.dom.form.postEventSelector.value
    };
    $('#new-post-form').find('textarea').val('');
    API.post('api/post/', data, Post, postView.renderPage);
  });

  //DONE add filter by topics
  //DONE add user contact info

  function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

  module.postView = postView;
})(window);
