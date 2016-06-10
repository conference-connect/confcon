(function (module){

  var adminUsersView = {

    renderTemplate(user){
      var template = Handlebars.compile($('#user-template').text());
      var htmlObject = template(user);
      return htmlObject;
    },

    renderAllAdminUsers () {

      API.getAll('/users/list', User, function(arrayOfUsers){

        $('#all-users').off('click');
        $('#all-users').empty();
        arrayOfUsers.forEach(function(user){
          // Append each user to the list
          $('#all-users').append(adminUsersView.renderTemplate(user));
          // Delete button
          $(`#${user.id}`).on('click', function(e){
            e.preventDefault();
            API.delete('/users/' + e.target.id, User, adminUsersView.renderAllAdminUsers);
          });
          // Edit button
          $(`#${user.id}edit`).on('click', function(e){
            e.preventDefault();
            // Hide the edit button when tapped
            $(e.target).hide();

            // Show edit form
            var $begin = $('<form id=\'edit-user-form\' onsubmit=\'return false; class=\'form-horizontal\'></form>');
            var $groupRow = $('<div class=\'form-group row\'></div>');
            $begin.append($groupRow);
            $groupRow.append('<textarea name=\'userroles\' type=\'text\' class=\'form-control\' placeholder=\'add "admin" for full privileges\'>' + user.roles + '</textarea>');
            $groupRow.append('<textarea name=\'userusername\' type=\'text\' class=\'form-control\'>' + user.username + '</textarea><br />');
            $groupRow.append('<button data-id="' + user.id + '" class=\'edit-user-submit\' class=\'user-btn\' type=\'submit\'>update</button>');
            $groupRow.append('<button class=\'edit-user-cancel\' class=\'user-btn\' type=\'submit\'>cancel</button>');
            $(e.target).after($begin);
            adminUsersView.editform = document.getElementById('edit-user-form').elements;
          });
        });

        // Handle changes from edit button
        $('#all-users').on('click', 'button', function(e){
          e.preventDefault();
          if ($(e.target).hasClass('edit-user-submit')){
            var data = {
              username: adminUsersView.editform.userusername.value,
              roles: adminUsersView.editform.userroles.value ? [adminUsersView.editform.userroles.value] : []
            };
            const path = '/users/' + $(e.target).data('id');
            API.patch(path, data, User, adminUsersView.renderAllAdminUsers);
          }
          //Show edit button and remove edit boxes
          if ($(e.target).hasClass('edit-user-cancel')){
            $(e.target).parent().parent().prev().show();
            $(e.target).parent().parent().remove();
          }
        });
      });
    }
  };


  module.adminUsersView = adminUsersView;
})(window);
