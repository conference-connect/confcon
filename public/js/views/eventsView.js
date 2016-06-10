(function(module){
  var eventsView = {

    renderTemplate(event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    // calendar default (for testing)
    // calendar-check-o allEvents that are in agendaArray
    // calendar-plus-o allEvents that are not in agendaArray
    // calendar-times-o my-agenda

    renderAllEvents(){
      $('.my-agenda').hide();

      API.getAll('api/event/list', Event, function(arrayOfEvents){
        postView.populateEventSelector (arrayOfEvents);
        $('#all-events').empty();
        arrayOfEvents.forEach(function(event){
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#events').append(eventsView.renderTemplate(event));
        });
        $('.agenda-btn').children('i').addClass('fa-calendar-plus-o').removeClass('fa-calendar');
        eventsView.addToAgenda();
      });
    },

    addToAgenda(){
      $('.add-agenda-btn-handler').on('click', '.agenda-btn', function(e){
        e.preventDefault();
        var userId = window.userView.userId();
        var eventId = $(this).attr('data');
        var url = '/api/agenda/' + userId;
        var target = this;

        API.patch(url, {'event_id':eventId}, Event, function(agendaArray){
          console.log(agendaArray);
          $(target).children('i').removeClass('fa-calendar-plus-o').addClass('fa-calendar-check-o');
          //TODO how to get checkmark icon to persist on page reload.
        });
      });
    },

    removeFromAgenda(){
      $('.delete-agenda-btn-handler').on('click', '.agenda-btn', function(e){
        e.preventDefault();
        var userId = window.userView.userId();
        var eventId = $(this).attr('data');
        var url = '/api/agenda/delete/' + userId;

        API.patch(url, {'event_id': eventId}, Event, function(data){
          console.log(data);
        });
        $(this).parent().parent().remove();
      });
    },

    renderAgenda(){
      var userId = window.userView.userId();
      var url = '/api/agenda/' + userId;

      API.getAll(url, Event, function(agendaArray){
        $('#my-agenda').empty();
        console.log(agendaArray);
        agendaArray.forEach(function(event){
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#my-agenda').append(eventsView.renderTemplate(event));
        });
        $('.agenda-btn').children('i').addClass('fa-calendar-times-o').removeClass('fa-calendar');
        eventsView.removeFromAgenda();
      });
    },

    toggleEventsAgenda(){
      $('#my-agenda-btn').on('click', function(){
        $('.my-agenda').show();
        $('.all-events').hide();
        eventsView.renderAgenda();
        $('.agenda-btn').children('i').addClass('fa-calendar-times-o').removeClass('fa-calendar');
      });

      $('#all-events-btn').on('click', function(){
        $('.my-agenda').hide();
        $('.all-events').show();
        $('.agenda-btn').children('i').addClass('fa-calendar-plus-o').removeClass('fa-calendar-times-o');
      });
    }
  };

  module.eventsView = eventsView;
})(window);
