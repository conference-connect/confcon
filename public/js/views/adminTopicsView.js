(function(module){

  var adminTopicsView = {
    renderTemplate (event) {
      var template = Handlebars.compile($('#topic-template').text());
      var htmlObject = template(event);
      return htmlObject;
    },

    renderAllAdminTopics () {
      API.getAll('api/topic/list', Topic, function(arrayOfTopics){
        $('#all-topics').empty();
        arrayOfTopics.forEach(function(topic){
          // Append each topic to the list
          $('#all-topics').append(adminTopicsView.renderTemplate(topic));
          // Delete button
          $(`#${topic.id}`).on('click', function(e){
            e.preventDefault();
            API.delete('/api/topic/' + e.target.id, Topic, adminTopicsView.renderAllAdminTopics);
          });



        });



      });
    }

  };

  module.adminTopicsView = adminTopicsView;
})(window);
