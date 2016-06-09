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
    }

  };

  module.navView = navView;

})(window);
