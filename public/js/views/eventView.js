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
          var unformattedDate = event.date;
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          $('#all-events').append(eventView.renderTemplate(event));
          $(`#${event.id}`).on('click', (e)=>{
            e.preventDefault();
            API.delete ('/api/event/' + e.target.id, Post, eventView.renderAllEvents);
          });

          $(`#${event.id}edit`).on('click', function(e){
            e.preventDefault();

            $(e.target).hide();
            // hide or disable the existing edit button

            var $begin = $("<form id='edit-event-form' onsubmit='return false;'></form>");
            $begin.append('<textarea name=\'eventtitle\' type=\'text\'>' + event.title + '</textarea>');
            $begin.append('<textarea name=\'eventdate\' type=\'datetime\'>' + unformattedDate + '</textarea>');
    				$begin.append('<textarea name=\'eventspeakers\' type=\'text\'>' + event.speakers + '</textarea>');
    				$begin.append('<textarea name=\'eventlocation\' type=\'text\'>' + event.location + '</textarea><br />');
    				$begin.append('<button data-id="' + event.id + '" class=\'edit-event-submit\' class=\'event-btn\' type=\'submit\'>update</button>');
            $begin.append('<button class=\'edit-event-cancel\' class=\'event-btn\' type=\'submit\'>cancel</button>');

            $(e.target).after($begin);
            // respond to button

            // update models
            // remove edit window
          });
        });

        $('#all-events').on('click', 'button', function(e){
          if ($(e.target).hasClass('edit-event-submit')){
            e.preventDefault;
            var data = {
              title: $(e.target).prev().prev().prev().prev().prev().val(),
              date: $(e.target).prev().prev().prev().prev().val(),
              speakers: $(e.target).prev().prev().prev().val(),
              location: $(e.target).prev().prev().val()
            };
            const path = 'api/event/' + $(e.target).data('id');
            API.patch(path, data, Post, eventView.renderAllEvents);
          }

          if ($(e.target).hasClass('edit-event-cancel')){
            $(e.target).parent().prev().show();
            $(e.target).parent().remove();
          }

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
