var DLinkedList = function(){
  //just to be sure that removing works
  this.map = {};
  
  this.Node = function(val){
    this.val = val;
    this.next = null;
    this.prev = null;
  };
  
  this.size = 0;
  this.head = null;
  this.tail = null;
};

DLinkedList.prototype.addFront = function(val){
  var node = new this.Node(val);
  
  if (this.size === 0){
    this.head = node;
    this.tail = node;
  } else {
    //connecting current element to list
    node.next = this.head;
 
    //pointing lists prev to current element
    this.head.prev = node;
    
    //pointing lists head to current element
    this.head = node;
  }
  
  this.map[val] = node;
  
  this.size++;
  return node;
};

DLinkedList.prototype.addTail = function(val){
  var node = new this.Node(val);
  
  if (this.size === 0){
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  
  this.map[val] = node;
  
  this.size++;
  
  return node;
};

DLinkedList.prototype.getSize = function(){
  return this.size;
};

DLinkedList.prototype.removeNode = function(node){
  var prev = node.prev;
  var next = node.next;
  
  prev.next = next;
  
  if (this.size > 0){
    this.size--;
  }
};

DLinkedList.prototype.getStringifiedData = function(){
  var str = 'HEAD-';
  var curr = this.head;
  while (curr !== null){
    if (curr.next !== null){
      str += '-> ' + curr.val + ' <-';
    } else {
      str += '-> ' + curr.val;
    }
    
    curr = curr.next;
  }
  
  str += ' <--TAIL';
  console.log(str);
  return str;
};

DLinkedList.prototype.getMap = function(){
  return this.map;
}



var list = new DLinkedList();
list.addFront(1);
list.addFront(2);
list.addTail(3);
list.addTail(4);
list.addFront(5);
list.getStringifiedData(); // "HEAD--> 5 <--> 2 <--> 1 <--> 3 <--> 4 <--TAIL"

list.removeNode(list.getMap()[3]);
list.getStringifiedData(); // "HEAD--> 5 <--> 2 <--> 1 <--> 4 <--TAIL"

list.addFront(6);
list.getStringifiedData(); // "HEAD--> 6 <--> 5 <--> 2 <--> 1 <--> 4 <--TAIL"

list.addTail(7);
list.getStringifiedData(); //"HEAD--> 6 <--> 5 <--> 2 <--> 1 <--> 4 <--> 7 <--TAIL"
