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
    standardColors: {
      thing: 'that'
    }

  };

  module.navView = navView;

})(window);
