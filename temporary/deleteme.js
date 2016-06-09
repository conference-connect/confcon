// _________Add to postView

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

// add the topics lines
const arrayOfTopics = getSelectValues(postView.dom.form.newposttopics) || [];

var data = {
  body: postView.dom.form.postmsg.value,
  author: user.id,
  topics: arrayOfTopics
};


//______ Add to adminTopicsView.js
// Append each topic to the new post drop down list
$('#topics-drop-down').append('<option value="' + topic.id + '">' + topic.title + '</option>');
// Delete button

//______ Add to index.html
<h5>Optional Topic Tags</h5>
<select id="topics-drop-down" name="newposttopics" class="form-control" multiple size="2">
  <!-- <option value="red">Red</option> -->
</select><br>
