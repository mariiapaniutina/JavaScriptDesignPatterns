var observer = function(){
  this.subscribers = {};
  
  this.subscribe = function(type, fn){
    if (this.subscribers[type] === undefined){
      
      this.subscribers[type] = [];
    }
    
    if (this.subscribers[type].indexOf(fn)  == -1){
      this.subscribers[type].push(fn);
    }
  };
  
  this.unsubscribe = function(type, fn){
    var listeners = this.subscribers[type];
    
    if (listeners === undefined){
      return;
    }
    
    var idx = listeners.indexOf(fn);
    if (idx > -1){
      this.subscribers.splice(idx, 1);
    }
  };
  
  this.publish = function(type, e){
    if (this.subscribers[type] === undefined){
      return;
    }
    
    if (e.type === undefined){
      e.type = type;
    }
    
    var listeners = this.subscribers[type];
    var len = listeners.length;
    for (var i=0; i<len; i++){
      listeners[i](e);
    }
  };
  
  
};

var testMe1 = function(e){
  console.log(e.msg);
};

var testMe2 = function(e){
  console.log('mmm... testMe2');
};

var PubSub = new observer();

PubSub.subscribe('First', testMe1);
PubSub.subscribe('First', testMe2);
PubSub.publish('First', {msg: 'This is First'});
