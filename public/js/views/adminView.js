(function(module){

  var adminView = {

    renderAdmin(){
      // Section title will hide or show the section
      $('.admin-section').on('click', 'a', function(e){
        e.preventDefault();
        $(e.target).parent().next().toggle();
      });
      // Initially have section hidden
      $('.toggle-visible').toggle();
    }


  };

  module.adminView = adminView;
})(window);
