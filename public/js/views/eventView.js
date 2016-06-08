(function (module){

  function renderAllEvents(){

    retrieveAllEvents(function(arrayOfEvents){
      console.log(arrayOfEvents);
    });

  }

  module.renderAllEvents = renderAllEvents;
})(window);
