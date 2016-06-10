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
          // Add conf name to top of page
          if (data.name){
            var logo = data.name + ' ' + data.year;
            $('#conf-logo').empty().append(logo);
          }

          // Conference logo event handler
          $('#conf-logo-link').on('click', function(e){
            e.preventDefault();
            
            //populate user data onto modal window
            $('.modal-title-config').text(`${data.name} ${data.year}`);
            $('.config-description').text(data.description);
            $('.config-city').text(data.city);
            $('.config-email').text(data.contact_email);
            $('.config-phone').text(data.contact_phone);
            $('.config-address').text(data.contact_address);
          });


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
        contact_email: adminConfigView.dom.form.contact_email.value,
        contact_phone: adminConfigView.dom.form.contact_phone.value,
        contact_address: adminConfigView.dom.form.contact_address.value,
        description: adminConfigView.dom.form.description.value
      };
      API.patch('/api/config/', data, window.Config, function(){
        adminConfigView.renderAllAdminConfigs();
        alert('Config updated!');
      });
    });
  }

  module.adminConfigView = adminConfigView;
})(window);
