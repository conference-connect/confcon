(function (module){

  var adminEventsView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#event-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    renderAllAdminEvents () {
      API.getAll('api/event/list', Event, function(arrayOfEvents){
        $('#all-events').off('click');
        $('#all-events').empty();
        arrayOfEvents.forEach(function(event){
          var unformattedDate = event.date;
          event.date = moment(event.date).format('HH:mm on MM-DD-YY');
          // Append each event to the list
          $('#all-events').append(adminEventsView.renderTemplate(event));
          // Delete button
          $(`#${event.id}`).on('click', function(e){
            e.preventDefault();
            API.delete('/api/event/' + e.target.id, Event, adminEventsView.renderAllAdminEvents);
          });
          // Edit button
          $(`#${event.id}edit`).on('click', function(e){
            e.preventDefault();
            // Hide the edit button when tapped
            $(e.target).hide();
            // Show edit boxes
            var $begin = $('<form id=\'edit-event-form\' onsubmit=\'return false; class=\'form-horizontal\'></form>');
            var $groupRow = $('<div class=\'form-group row\'></div>');
            $begin.append($groupRow);
            $groupRow.append('<textarea name=\'eventtitle\' type=\'text\' class=\'form-control\'>' + event.title + '</textarea>');
            $groupRow.append('<textarea name=\'eventdate\' type=\'datetime\' class=\'form-control\'>' + unformattedDate + '</textarea>');
            $groupRow.append('<textarea name=\'eventspeakers\' type=\'text\' class=\'form-control\'>' + event.speakers + '</textarea>');
            $groupRow.append('<textarea name=\'eventlocation\' type=\'text\' class=\'form-control\'>' + event.location + '</textarea><br />');
            $groupRow.append('<button data-id="' + event.id + '" class=\'edit-event-submit\' class=\'event-btn\' type=\'submit\'>update</button>');
            $groupRow.append('<button class=\'edit-event-cancel\' class=\'event-btn\' type=\'submit\'>cancel</button>');
            $(e.target).after($begin);
          });
        });

        // Handle changes from edit button
        $('#all-events').on('click', 'button', function(e){
          e.preventDefault();
          if ($(e.target).hasClass('edit-event-submit')){
            var data = {
              title: $(e.target).prev().prev().prev().prev().prev().val(),
              date: $(e.target).prev().prev().prev().prev().val(),
              speakers: $(e.target).prev().prev().prev().val(),
              location: $(e.target).prev().prev().val()
            };
            const path = 'api/event/' + $(e.target).data('id');
            API.patch(path, data, Event, adminEventsView.renderAllAdminEvents);
          }
          // Show edit button and remove edit boxes
          if ($(e.target).hasClass('edit-event-cancel')){
            $(e.target).parent().parent().prev().show();
            $(e.target).parent().parent().remove();
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
      title: adminEventsView.dom.form.eventtitle.value,
      date: adminEventsView.dom.form.eventdate.value,
      location: adminEventsView.dom.form.eventlocation.value,
      speakers: [adminEventsView.dom.form.eventspeakers.value]
    };
    API.post('api/event/', data, Event, adminEventsView.renderAllAdminEvents);
  });

  module.adminEventsView = adminEventsView;
})(window);
