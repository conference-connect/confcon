(function (module){

  var eventView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);

      return htmlObject;
    },

    renderAllEvents () {
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        console.log(arrayOfEvents);
        arrayOfEvents.forEach(function(event){

          $('#all-events').append(eventView.renderTemplate(event));
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
      date: eventView.dom.form.eventdate.value
    };
    console.log(data);
    API.post('api/event/', data, Post, postView.renderPage);
  });

  module.eventView = eventView;
})(window);
