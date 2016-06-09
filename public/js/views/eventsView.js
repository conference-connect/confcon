(function(module){
  var eventsView = {

    //render events
    renderTemplate(event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    //get all events
    renderAllEvents(){
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        $('#all-events').empty();
        arrayOfEvents.forEach(function(event){
          console.log(event);
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#events').append(eventsView.renderTemplate(event));
          $('.admin-input').remove();
        });

      });
    }


    //favorites control

  };

  module.eventsView = eventsView;
})(window);
