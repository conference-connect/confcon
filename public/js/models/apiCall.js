(function(module){

  var API = {
    retrieveOne (url, Item, callback) {
      $.ajax({
        url: url,
        type: 'GET',
        headers: {token: localStorage.token}})
      .done(function(data){
        var returnObject = new Item(data);
        callback(returnObject);
      })
      .fail(function(){
        console.log('RetrieveAll: failure to complete ajax call to ' + url);
        callback([]);
      });
    },
    retrieveAll (url, Item, callback) {
      $.ajax({
        url: url,
        type: 'GET',
        headers: {token: localStorage.token}})
      .done(function(data){
        var newArray = data.map(function(el){
          return new Item(el);
        });
        callback(newArray);
      })
      .fail(function(){
        console.log('RetrieveAll: failure to complete ajax call to ' + url);
        callback([]);
      });
    },
    makeNew (url, data, Item, callback){
      $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {token: localStorage.token}})
      .done(function(data){
        var returnObject = new Item(data);
        callback(returnObject);
      })
      .fail(function(){
        console.log('makeNew: failure to complete ajax call to ' + url);
        callback({});
      });
    },
    edit (url, data, Item, callback) {
      $.ajax({
        url: url,
        type:'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {token: localStorage.token}})
      .done(function(data){
        var returnObject = new Item(data);
        callback(returnObject);
      })
      .fail(function(){
        console.log('Edit: failure to complete ajax call to ' + url);
        callback({});
      });
    },
    delete (url, Item, callback) {
      $.ajax({
        url: url,
        type:'DELETE',
        headers: {token: localStorage.token}})
      .done(function(data){
        var returnObject = new Item(data);
        callback(returnObject);
      })
      .fail(function(){
        console.log('Delete: failure to complete ajax call to ' + url);
        callback({});
      });
    }


  };

  module.API = API;

})(window);
