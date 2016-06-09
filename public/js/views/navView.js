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
    },
    logout () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = 'login.html';
    }

  };

  $('#logout').click(navView.logout);
  module.navView = navView;

})(window);
