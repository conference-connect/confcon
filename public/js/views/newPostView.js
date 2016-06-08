(function (module){
  //hide other 'pages'

  //on click 'submit'

  function postFormSubmit(){
  //how to store form contents, pass to makeNewPost
    $('#new-post').on( 'submit', function( event ) {
      event.preventDefault();
      var formContents = $( this ).serialize();

      makeNewPost(formContents, function(data){
        console.log(data);
      });
    });
  }

  module.postFormSubmit = postFormSubmit;
})(window);
