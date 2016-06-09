(function(module){

  var adminTopicsView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#topic-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    renderAllAdminTopics() {
      API.getAll('api/topic/list', window.Topic, function(arrayOfTopics){
        $('#all-topics').off('click');
        $('#all-topics').empty();
        arrayOfTopics.forEach(function(topic){
          // Append each topic to the list
          $('#all-topics').append(adminTopicsView.renderTemplate(topic));
          // Delete button
          $(`#${topic.id}`).on('click', function(e){
            e.preventDefault();
            // $(e.target).unbind('click');
            API.delete('/api/topic/' + e.target.id, window.Topic, adminTopicsView.renderAllAdminTopics);
          });
          // Edit button
          $(`#${topic.id}edit`).on('click', function(e){
            e.preventDefault();
            // Hide the edit button when tapped
            $(e.target).hide();
            // Show edit boxes
            var $begin = $('<form id=\'edit-topic-form\' onsubmit=\'return false; class=\'form-horizontal\'></form>');
            var $groupRow = $('<div class=\'form-group row\'></div>');
            $begin.append($groupRow);
            $groupRow.append('<textarea name=\'topictitle\' type=\'text\' class=\'form-control\'>' + topic.title + '</textarea>');
            var $selectGroup = $('<select name="topictitle" class="form-control">');
            selectHtml($selectGroup);
            $groupRow.append($selectGroup);
            // $groupRow.append('<textarea name=\'topiccolor\' type=\'text\' class=\'form-control\'>' + topic.color + '</textarea><br />');
            $groupRow.append('<button data-id="' + topic.id + '" class=\'edit-topic-submit\' class=\'topic-btn\' type=\'submit\'>update</button>');
            $groupRow.append('<button class=\'edit-topic-cancel\' class=\'topic-btn\' type=\'submit\'>cancel</button>');
            $(e.target).after($begin);
          });
        });

        // Handle change from edit button
        $('#all-topics').on('click', 'button', function(e){
          e.preventDefault();

          if ($(e.target).hasClass('edit-topic-submit')){
            var data = {
              title: $(e.target).prev().prev().val(),
              color: $(e.target).prev().val()
            };
            const path = 'api/topic/' + $(e.target).data('id');
            API.patch(path, data, window.Topic, adminTopicsView.renderAllAdminTopics);
          }

          // Show edit button and remove edit boxes
          if ($(e.target).hasClass('edit-topic-cancel')){
            $(e.target).parent().parent().prev().show();
            $(e.target).parent().parent().remove();
          }
        });
      });
    },
    dom: {
      form: document.getElementById('new-topic-form').elements
    }
  };

  function selectHtml(domObj){
    domObj.append(
      '<option value="red">Red</option><option value="blue">Blue</option><option value="orange">Orange</option><option value="yellow">Yellow</option><option value="brown">Brown</option><option value="purple">Purple</option><option value="green">Green</option>'
    );
  }

  $('#new-topic-submit').click(function () {
    var data = {
      title: adminTopicsView.dom.form.topictitle.value,
      color: adminTopicsView.dom.form.topiccolor.value
    };
    API.post('api/topic/', data, window.Topic, adminTopicsView.renderAllAdminTopics);
  });

  module.adminTopicsView = adminTopicsView;
})(window);
