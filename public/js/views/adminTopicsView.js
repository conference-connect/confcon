(function(module){

  var adminTopicsView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#topic-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    renderAllAdminTopics () {
      API.getAll('api/topic/list', Topic, function(arrayOfTopics){
        $('#all-topics').off('click');
        $('#all-topics').empty();
        arrayOfTopics.forEach(function(topic){
          // Append each topic to the list
          $('#all-topics').append(adminTopicsView.renderTemplate(topic));
          // Delete button
          $(`#${topic.id}`).on('click', function(e){
            e.preventDefault();
            // $(e.target).unbind('click');
            API.delete('/api/topic/' + e.target.id, Topic, adminTopicsView.renderAllAdminTopics);
          });
          // Edit button
          $(`#${topic.id}edit`).on('click', function(e){
            e.preventDefault();
            // Hide the edit button when tapped
            $(e.target).hide();
            // Show edit boxes
            var $begin = $("<form id='edit-topic-form' onsubmit='return false;'></form>");
            $begin.append('<textarea name=\'topictitle\' type=\'text\'>' + topic.title + '</textarea>');
            $begin.append('<textarea name=\'topiccolor\' type=\'text\'>' + topic.color + '</textarea><br />');
            $begin.append('<button data-id="' + topic.id + '" class=\'edit-topic-submit\' class=\'topic-btn\' type=\'submit\'>update</button>');
            $begin.append('<button class=\'edit-topic-cancel\' class=\'topic-btn\' type=\'submit\'>cancel</button>');
            $(e.target).after($begin);
          })
        });

        // Handle change from edit button
        $('#all-topics').on('click', 'button', function(e){

          if ($(e.target).hasClass('edit-topic-submit')){
            e.preventDefault();
            var data = {
              title: $(e.target).prev().prev().prev().val(),
              color: $(e.target).prev().prev().val()
            };
            const path = 'api/topic/' + $(e.target).data('id');
            API.patch(path, data, Topic, adminTopicsView.renderAllAdminTopics);
          }

          // Show edit button and remove edit boxes
          if ($(e.target).hasClass('edit-topic-cancel')){
            $(e.target).parent().prev().show();
            $(e.target).parent().remove();
          }
        });
      });
    },
    dom: {
      form: document.getElementById('new-topic-form').elements
    }
  };

  $('#new-topic-submit').click(function () {
    var data = {
      title: adminTopicsView.dom.form.topictitle.value,
      color: adminTopicsView.dom.form.topiccolor.value
    };
    API.post('api/topic/', data, Topic, adminTopicsView.renderAllAdminTopics);
  });

  module.adminTopicsView = adminTopicsView;
})(window);
