(function (module){

  var eventView = {
    renderAllEvents () {
      API.retrieveAll('api/event/list', Event, function(arrayOfEvents){
        console.log(arrayOfEvents);
      });
    }
  };

  module.eventView = eventView;
})(window);
