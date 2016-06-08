(function (module){

  var eventView = {
    renderAllEvents () {
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        console.log(arrayOfEvents);
      });
    }
  };

  module.eventView = eventView;
})(window);
