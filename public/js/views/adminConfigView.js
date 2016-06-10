(function(module){

  var adminConfigView = {

    renderTemplate(config){
      var template = Handlebars.compile($('#config-template').text());
      var htmlObject = template(config);
      return htmlObject;
    },

    renderAllAdminConfigs () {

      API.getOne('/api/config', window.Config, function(data){

        if (data.length < 1){
          // No Config on record, try to create one
          $('#config-wrapper').empty();
          $('#config-wrapper').append(adminConfigView.renderTemplate({}));
          // addEditConfigHandler();

          API.post('/api/config/', {config_id: '1', name: 'My Conference'}, window.Config, function(data){
            if (data.length < 1){
              $('#config-wrapper').empty();
              $('#config-wrapper').append(adminConfigView.renderTemplate({}));
              // addEditConfigHandler();
            }
          });

        }else{
          // Render config template
          $('#config-wrapper').empty();
          $('#config-wrapper').append(adminConfigView.renderTemplate(data));
          adminConfigView.dom.form = document.getElementById('edit-config').elements;
          addEditConfigHandler();
        }
      });
    },
    dom: {
      form: {}
    }
  };

  function addEditConfigHandler(){
    $('#edit-config-button').off('click');
    $('#edit-config-button').on('click', function(){
      var data = {
        config_id: '1',
        name: adminConfigView.dom.form.name.value,
        year: adminConfigView.dom.form.year.value,
        city: adminConfigView.dom.form.city.value,
        contact_email: adminConfigView.dom.form.contact_email.value
      };
      API.patch('/api/config/', data, window.Config, adminConfigView.renderAllAdminConfigs);
    });
  }

  module.adminConfigView = adminConfigView;
})(window);
