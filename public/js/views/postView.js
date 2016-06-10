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

    // takes two parameters, posts per page, and page number
    renderPage(perPage, page){
      // $('#new-post').hide();
      // $('#events').hide();
      // $('#my-profile').hide();

      API.getAll('api/post/list/'+perPage+'/'+page, Post, function(arrayOfPosts){
        $('#all-posts').empty();
        arrayOfPosts.reverse();
        arrayOfPosts.forEach(function(post){
          post.createdAt = moment(post.createdAt).format('HH:mm on MM-DD-YY');
          $('#all-posts').append(postView.renderPostTemplate(post));
          $(`#${post._id}`).on('click', function(e){
            e.preventDefault();
            function callback() {postView.renderPage(postView.perPage,postView.currentPage); }
            API.delete ('/api/post/' + e.target.id, Post, callback);
          });
        });
        window.userView.renderUser();
      });
    },
    dom: {
      form: document.getElementById('new-post-form').elements,
      $pse: $('#postEventSelector')
    },
    getPostCount() {
      $.ajax({
        url: '/api/post/postcount',
        type: 'GET',
        headers: {token: localStorage.token}})
      .done(function(data){
        console.log(data);
        postView.postCount = data;
      });
    },
    nextPage() {
      if (postView.currentPage <= Math.floor(postView.postCount/postView.perPage)) {
        postView.currentPage++;
        postView.renderPage(postView.perPage,postView.currentPage);
      }
    },
    prevPage() {
      if (postView.currentPage > 0) {
        postView.currentPage--;
        postView.renderPage(postView.perPage,postView.currentPage);
      }
    },
    currentPage: 0,
    perPage: 10

  };

  $('#next-page').click(postView.nextPage);
  $('#prev-page').click(postView.prevPage);

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
    function callback() {postView.renderPage(postView.perPage,postView.currentPage); }
    API.post('api/post/', data, Post, callback);
  });

  //TODO add filter by topics
  //TODO add user contact info

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
