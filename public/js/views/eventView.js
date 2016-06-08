(function (module){

  var eventView = {
    renderAllEvents () {
      Event.retrieveAll(function(arrayOfEvents){
        console.log(arrayOfEvents);
      });
    }
  };

  module.eventView = eventView;
})(window);
