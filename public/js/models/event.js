(function(module){

  function Event(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    },this);
  }

  Event.retrieveAll = function(callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({url:'/api/event/list', headers: {'token': tokenFromStorage}}, {method:'GET'})
    .done( data => {
      var newArray = data.map( (el) => {
        return new Event(el);
      });
      callback(newArray);
    })
    .fail( () => {
      console.log('failure to complete ajax call in retrieveAllEvents');
      callback([]);
    });
  };

  Event.getDetail = function(eventID, callback){
    const tokenFromStorage = localStorage.token;
    const detailUrl = `/api/event/${eventID}`;
    $.ajax({url:detailUrl, headers: {'token': tokenFromStorage}}, {method:'GET'})
    .done( data => {
      var eventDetail = new Event(data);
      callback(eventDetail);
    })
    .fail( () => {
      console.log('failure to complete ajax call in getEventDetail');
      callback([]);
    });
  };

  Event.makeNew = function(eventData, callback){
    const tokenFromStorage = localStorage.token;
    $.ajax({
      url:'/api/event/',
      type:'POST',
      contentType: 'application/json',
      data: JSON.stringify(eventData),
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Event(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in makeNewEvent');
      callback({});
    });
  };

  Event.edit = function(eventData, callback){
    const tokenFromStorage = localStorage.token;
    const updateUrl = '/api/event/';
    $.ajax({
      url:updateUrl,
      type:'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(eventData),
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Event(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in editEvent');
      callback({});
    });
  };

  Event.delete = function(eventID, callback){
    const tokenFromStorage = localStorage.token;
    const deleteUrl = `/api/event/${eventID}`;
    $.ajax({
      url:deleteUrl,
      type:'DELETE',
      headers: {'token': tokenFromStorage}})
    .done( data => {
      var returnObject = new Event(data);
      callback(returnObject);
    })
    .fail( () => {
      console.log('failure to complete ajax in deleteEvent');
      callback({});
    });
  };

  module.Event = Event;
})(window);
