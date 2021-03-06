(function(module){

  var navView = {
    renderNavView (isAdmin){

      if (isAdmin){
        $('#admin-nav-link').show();
        $('#admin').show();
      }else{
        $('#admin-nav-link').hide();
        $('#admin').hide();
      }

      // Handle changes in main navView
      $('.nav-menu').off('click');
      $('.nav-menu').on('click', 'a', function (e){
        e.preventDefault();
        var anchor = $(this).data('anchor');
        $('.main-nav').hide();
        $('#'+anchor).show();
      });

      // Initially hide sections except for posts
      $('.main-nav').hide();
      $('#posts-wrapper').show();
    },
    logout () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = 'login.html';
    }
  };

// Handle changes to topic filter
  $('#filter-topic-dropdown').on('change', function(e){
    e.preventDefault();
    var idValue = $(e.target).val();
    $('#all-posts > article').hide();
    if (!idValue){
      $('#all-posts > article').show();
    }else{
      $('article:has(li[data-id|="' + idValue + '"])').show();
    }
  });

  // Handle topic clear button
  $('#filter-topic-clear').on('click', function(e){
    e.preventDefault();
    $('#all-posts > article').show();
    // Reset the drop down
    $('#filter-topic-dropdown :nth-child(1)').prop('selected', true);
  });

  $('#logout').click(navView.logout);
  module.navView = navView;

})(window);
