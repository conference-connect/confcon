(function (module){

  var eventView = {};

  eventView.renderAllEvents = function(){

    Event.retrieveAll(function(arrayOfEvents){
      console.log(arrayOfEvents);
    });

  };

  module.eventView = eventView;
})(window);
