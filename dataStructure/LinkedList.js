var LinkedList = function(){
  this.Node = function(val){
    this.val = val;
    this.next = null;
  };
  
  this.head = null;
  this.size = 0;
};

LinkedList.prototype.push = function(val){
  var el = new this.Node(val);
  if(this.head == null){
    this.head = el;
  } else {
    var newHead = this.head;
    while(newHead.next !== null){
      newHead = newHead.next;
    }
    newHead.next = el;
  }
  
  this.size++;
};

LinkedList.prototype.pop = function(){
  var newHead = this.head;
  if(this.size < 2){
    this.head = null;
  }
  for (var i=0; i<this.size-2; i++){
    newHead = newHead.next;
  }
  newHead.next = null;
  this.size--;
};

LinkedList.prototype.indexOf = function(val){
  var newHead = this.head;
  if (this.head == null){
    return -1;
  }
  for (var i=0; i<this.size; i++){
    if(newHead.val == val){
      return i;
    }
    newHead = newHead.next;
  }
  return -1;
};

LinkedList.prototype.getSize = function(){
  return this.size;
};

LinkedList.prototype.getData = function(){
  return JSON.stringify(this.head);
};
