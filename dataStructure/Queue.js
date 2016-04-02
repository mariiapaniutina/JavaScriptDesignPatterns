var Queue = function(){
  this.size = 0;
  this.data = [];
};

//to add one or more elements to queue
Queue.prototype.enqueue = function(el){
  var args = Array.prototype.slice.call(arguments);
  var el_size = args.length;
  
  this.data = this.data.concat(args);
  this.size += el_size;
};

//return size of gueue
Queue.prototype.size = function(){
  return this.size;
};

//return TRUE if queue is empty
Queue.prototype.isEmpty = function(){
  return (this.size == 0);
};

Queue.prototype.dequeue = function(){
  return this.data.shift();
};
