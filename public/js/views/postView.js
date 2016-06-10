(function (module){

  var adminFlag = false;

  var postView = {
    renderPostTemplate (post) {
      var template = Handlebars.compile($('#post-template').text());
      var htmlObject = template(post);
      return htmlObject;
    },
    populateEventSelector (events) {
      var optionTag = '';
      postView.dom.$pse.empty();
      var template = Handlebars.compile($('#post-selector-template').text());
      postView.dom.$pse.append(template({title: ''}));
      events.forEach(function (e) {
        optionTag = template(e);
        postView.dom.$pse.append(optionTag);
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
          $('#currentPage').text(postView.currentPage+1);
          $('#all-posts').append(postView.renderPostTemplate(post));
          $(`#${post._id}`).on('click', function(e){
            e.preventDefault();
            function callback() {postView.renderPage(postView.perPage, postView.currentPage, isAdmin); }
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
        postView.postCount = data;
        postView.numPages = Math.ceil(postView.postCount/postView.perPage);
        $('#numPages').text(postView.numPages);
      });

    },
    nextPage(e) {
      e.preventDefault();
      if (postView.currentPage < postView.numPages-1) {
        postView.currentPage++;
        $('#currentPage').text(postView.currentPage+1);
        postView.renderPage(postView.perPage, postView.currentPage, adminFlag);
        // Reset the topic filter drop down
        $('#filter-topic-dropdown :nth-child(1)').prop('selected', true);
      }
    },
    prevPage(e) {
      e.preventDefault();
      if (postView.currentPage > 0) {
        postView.currentPage--;
        $('#currentPage').text(postView.currentPage+1);
        postView.renderPage(postView.perPage, postView.currentPage, adminFlag);
        // Reset the topic filter drop down
        $('#filter-topic-dropdown :nth-child(1)').prop('selected', true);
      }
    },
    currentPage: 0,
    perPage: 30

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

    postView.postCount++;
    $('#topics-drop-down').children().prop('selected', false);
    function callback() {
      postView.renderPage(postView.perPage, postView.currentPage, adminFlag);
      $('.main-nav').hide();
      $('#posts-wrapper').show();
    }

    API.post('api/post/', data, Post, callback);
  });

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
