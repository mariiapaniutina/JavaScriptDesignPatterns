var PriorityQueue = function(){
  this.data = [];
};

PriorityQueue.prototype.isEmpty = function(){
  var len = this.data.length;
  return len == 0;
}

PriorityQueue.prototype.enqueue = function(el, priority){
  var quequeEl = {
    element: el,
    priority: priority
  };
  var added = false;
  
  if(this.isEmpty()){
    //this is totally first element
    this.data.push(quequeEl);
  } else {
    for (var i=0; i<this.data.length; i++){
      //checking if element can be put in the middle or beginning f queue
      if(priority < this.data[i].priority){
        this.data.splice(i, 0, quequeEl);
        added = true;
        //need to break, because of raise condition (length of queue was changed)
        break;
      }
    }
    //if element priority is tpp big, add him to the end
    if(added === false){   
      this.data.push(quequeEl);
    }
  }
};

PriorityQueue.prototype.dequeue = function(){
  var el = this.data.shift();
  return el;
};

PriorityQueue.prototype.getQueueData = function(){
  return JSON.stringify(this.data);
};

PriorityQueue.prototype.getSize = function(){
  return this.data.length;
};
