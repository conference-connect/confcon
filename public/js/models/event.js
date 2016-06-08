(function(module){

  function Event(obj){
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    },this);
  }
  
  module.Event = Event;
})(window);
