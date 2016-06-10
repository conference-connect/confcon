(function(module){
  var eventsView = {

    renderTemplate(event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    renderAllEvents(){
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        $('#all-events').empty();
        arrayOfEvents.forEach(function(event){
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#events').append(eventsView.renderTemplate(event));
        });
        eventsView.addToAgenda();
      });
    },

    addToAgenda(){
      $('.agenda-btn-handler').on('click', '.add-agenda-btn', function(e){
        e.preventDefault();
        var userId = window.userView.userId();
        var eventId = $(this).attr('data');
        var url = '/api/agenda/' + userId;
        var target = this;

        API.patch(url, {'event_id':eventId}, Event, function(agendaArray){
          console.log(agendaArray);
          $(target).children('i').removeClass('fa-calendar-plus-o').addClass('fa-calendar-check-o');
          //DONE change cal btn to cal_check when added to agenda
          //TODO how to get checkmark icon to persist on page reload.
        });
      });
    },

    renderAgenda(){
      var userId = window.userView.userId();
      var url = '/api/agenda/' + userId;
      API.getAll(url, Event, function(agendaArray){
        console.log(agendaArray);
        $('#my-agenda').empty();
        agendaArray.forEach(function(event){
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#my-agenda').append(eventsView.renderTemplate(event));
        });
      });
    },

    toggleEventsAgenda(){
      $('#my-agenda-btn').on('click', function(){
        $('.my-agenda').show();
        $('.all-events').hide();
      });

      $('#all-events-btn').on('click', function(){
        $('.all-events').hide();
        $('all-agenda').show();
      });
    },

    renderEventsPage(){
      eventsView.renderAllEvents();
      eventsView.renderAgenda();
      eventsView.toggleEventsAgenda();
      $('.my-agenda').hide();
    }
  };

  module.eventsView = eventsView;
})(window);
