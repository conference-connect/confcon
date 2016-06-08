(function (module){

  var eventView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);

      return htmlObject;
    },

    renderAllEvents () {
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        $('#all-events').empty();
        arrayOfEvents.forEach(function(event){
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          console.log(event);
          $('#all-events').append(eventView.renderTemplate(event));
          $(`#${event.id}`).on('click', (e)=>{
            e.preventDefault();
            API.delete ('/api/event/' + e.target.id, Post, eventView.renderAllEvents);
          });
        });
      });
    },
    dom: {
      form: document.getElementById('new-event-form').elements
    }
  };

  $('#new-event-submit').click(function () {
    var data = {
      title: eventView.dom.form.eventtitle.value,
      date: eventView.dom.form.eventdate.value,
      location: eventView.dom.form.eventlocation.value,
      speakers: [eventView.dom.form.eventspeakers.value]
    };
    console.log(data);
    API.post('api/event/', data, Post, eventView.renderAllEvents);
  });

  module.eventView = eventView;
})(window);
