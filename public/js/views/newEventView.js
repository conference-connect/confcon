(function (module){
  //hide other 'pages'

  //on click 'submit'

  function eventFormSubmit(){
  //how to store form contents, pass to makeNewPost
    $('#new-event').on( 'submit', function( event ) {
      event.preventDefault();
      var formContents = $( this ).serialize();

      API.post(formContents, function(data){
        console.log(data);
      });
    });
  }

  module.eventFormSubmit = eventFormSubmit;
})(window);
