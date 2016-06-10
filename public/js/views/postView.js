(function (module){

  var adminFlag = false;

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
      postView.dom.$pse.append(template({title: ''}));
      API.getAll('api/event/list', Event, function(events) {
        events.forEach(function (e) {
          optionTag = template(e);
          postView.dom.$pse.append(optionTag);
        });
      });
    },

    // takes three parameters, posts per page, page number and isAdmin
    renderPage(perPage, page, isAdmin){
      adminFlag = isAdmin;
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
            function callback() {postView.renderPage(postView.perPage,postView.currentPage, isAdmin); }
            API.delete ('/api/post/' + e.target.id, Post, callback);
          });
        });
        // Hide delete button on posts if not Admin
        if (!isAdmin) $('.hide-from-public').hide();
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
        postView.postCount = data;
      });
    },
    nextPage() {
      if (postView.currentPage <= Math.floor(postView.postCount/postView.perPage) -1) {
        postView.currentPage++;
        $('#currentPage').val(postView.currentPage);
        postView.renderPage(postView.perPage,postView.currentPage, adminFlag);
      }
    },
    prevPage() {
      if (postView.currentPage > 0) {
        postView.currentPage--;
        $('#currentPage').val(postView.currentPage);
        postView.renderPage(postView.perPage,postView.currentPage), adminFlag;
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

    var eventValue = postView.dom.form.postEventSelector.value;
    if (eventValue === '') eventValue = null;

    var data = {
      body: postView.dom.form.postmsg.value,
      author: user.id,
      topics: arrayOfTopics,
      event: eventValue
    };
    $('#new-post-form').find('textarea').val('');
    $('#topics-drop-down').children().prop('selected', false);
    function callback() {
      postView.renderPage(postView.perPage,postView.currentPage);
      $('.main-nav').hide();
      $('#posts-wrapper').show();
    }
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
