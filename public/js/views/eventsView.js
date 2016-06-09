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
        });
        eventsView.addToAgenda();
      });
    },

    //agenda control
    addToAgenda(){
      $('.agenda-btn-handler').on('click', '.agenda-btn', function(e){
        e.preventDefault();
        var eventId = $(this).attr('data');
        var userId = userView.userId();

        var url = '/api/users/:' + userId;

        API.patch(url, eventId, User, function(agendaArray){
          
        });
      });

    },

    renderAgenda(){
      //API call --> get logged in user's agenda: GET users/:id
    }
  };

  module.eventsView = eventsView;
})(window);
