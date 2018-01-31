var DDList = function(){
  //constructor for list node
  this.Node = function(key, val){
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  };
  
  //first element of list
  this.listHead = null;
  
  //last element of list
  this.listTail = null;
  
  //size of linked list
  this.listSize = 0;
  
  //map which provides immidiate access to elements in list (via key)
  this.listKeyMap = {};
};

//pushing new nodes in back of list
DDList.prototype.pushBack = function(key, val){
  var nodeToAdd = new this.Node(key, val);
  
  //if key is already presenting in map and in list => error
  if (this.listKeyMap[key]){
    return -1;
  }
  
  //first element
  if (this.listSize === 0) {
    this.listHead = nodeToAdd;
    this.listTail = nodeToAdd;
  } else {
    this.listTail.next = nodeToAdd;
    nodeToAdd.prev = this.listTail;
    this.listTail = nodeToAdd;
  }
  
  this.listKeyMap[key] = nodeToAdd;
  this.listSize++;
};

//pushing new nodes in front of list
DDList.prototype.pushFront = function(key, val){
  var nodeToAdd = new this.Node(key, val);
  
  //if key is already presenting in map and in list => error
  if (this.listKeyMap[key]){
    return -1;
  }
  
  //first element
  if (this.listSize === 0) {
    this.listHead = nodeToAdd;
    this.listTail = nodeToAdd;
  } else {
   this.listHead.prev = nodeToAdd;
   nodeToAdd.next = this.listHead;
   this.listHead = nodeToAdd;
  }
  
  this.listKeyMap[key] = nodeToAdd;
  this.listSize++;
};

DDList.prototype.pushAfter = function(afterNodeKey, key, val){
  //if there is no such node with that key => error
  //or we already have element with new node (key) in list => error
  if (!this.listKeyMap[afterNodeKey] || this.listKeyMap[key]){
    return -1;
  }
  
  var nodeToAdd = new this.Node(key, val);
  var nodeAfter = this.listKeyMap[afterNodeKey];
  
  //if node, after we have to insert is tail 
  if (this.listKeyMap[afterNodeKey].next === null) {
    this.pushBack(key, val);
  } else {
    nodeToAdd.next = nodeAfter.next;
    nodeToAdd.prev = nodeAfter;
    nodeToAdd.next.prev = nodeToAdd;
    nodeAfter.next = nodeToAdd;
    
    this.listKeyMap[key] = nodeToAdd;
    this.listSize++;
  }
};

DDList.prototype.popBack = function(){
  //if list is empty => do nothing
  if (this.listSize === 0) {
    return;
  }
  
  var tailKey = this.listTail.key;
  
  //checking if only one element in list
  if (this.listSize === 1){
    this.listHead = null;
    this.listTail = null;
  } else {
    //saving reference to tail
    var oldTail = this.listTail;
    
    //saving reference to new tail
    var newTail = oldTail.prev;
    
    newTail.next = null;
    this.listTail = newTail;
    oldTail.prev = null;
  }
  
  delete this.listKeyMap[tailKey];
  this.listSize--;
};

DDList.prototype.popFront = function(){
  //if list is empty => do nothing
  if (this.listSize === 0) {
    return;
  }
  
  var headKey = this.listHead.key;
  
  //checking if only one element in list
  if (this.listSize === 1){
    this.listHead = null;
    this.listTail = null;
  } else {
    var oldHead = this.listHead;
    var newHead = oldHead.next;
    
    newHead.prev = null;
    this.listHead = newHead;
  }
  
  delete this.listKeyMap[headKey];
  this.listSize--;
};

DDList.prototype.removeAtKey = function(key){
  //if list does not have such key => error
  if (!this.listKeyMap[key]){
    return -1;
  }
  
  var nodeToRemove = this.listKeyMap[key];
  var nodeFrom = nodeToRemove.prev;
  var nodeTo = nodeToRemove.next;
  
  //remove only one element from list
  if (this.listSize === 1) {
    this.listHead = null;
    this.listTail = null;
    
    delete this.listKeyMap[key];
    this.listSize--;
  } else if (this.listTail.key === key){ //tail
    this.popBack();
  } else if (this.listHead.key === key){ //head
    this.popFront();
  } else {
    nodeFrom.next = nodeTo;
    nodeTo.prev = nodeFrom;
    nodeToRemove.next = null;
    nodeToRemove.prev = null;
    
    delete this.listKeyMap[key];
    this.listSize--;
  }
  
};

DDList.prototype.printList = function(){
  //console.log('===map', this.listKeyMap);
  
  var newHead = this.listHead;
  var strToPrint = '';
  
  while (newHead !== null) {
    strToPrint += ' [' + newHead.key + ',' + newHead.val + '] ';
    
    if (newHead.next !== null) {
      strToPrint += ' <===> ';
    }
    newHead = newHead.next;
  }
  console.log(strToPrint);
  return strToPrint;
};

DDList.prototype.getList = function(){
  return this.listHead;
};

//example of usage
var list = new DDList();
console.log('== == add back [1, 1]');
list.pushBack(1, 1);
list.printList();

console.log('== == add back [2, 2]');
list.pushBack(2, 2);
list.printList();

console.log('== == add front [3, 3]');
list.pushFront(3, 3);
list.printList();

console.log('== == push [5, 5] after node with idx: 1');
list.pushAfter(1, 5, 5);
list.printList();

console.log('== == push [6, 6] after node with idx: 5');
list.pushAfter(5, 6, 6);
list.printList();

console.log('== == remove last element');
list.popBack();
list.printList();

console.log('== == remove first element');
list.popFront();
list.printList();

console.log('== == remove element with idx: 5');
list.removeAtKey(5);
list.printList();

console.log('== == remove element with idx: 6');
list.removeAtKey(6);
list.printList();

console.log('== == remove element with idx:1');
list.removeAtKey(1);
list.printList();

/**
== == add back [1, 1]
 [1,1] 
== == add back [2, 2]
 [1,1]  <===>  [2,2] 
== == add front [3, 3]
 [3,3]  <===>  [1,1]  <===>  [2,2] 
== == push [5, 5] after node with idx: 1
 [3,3]  <===>  [1,1]  <===>  [5,5]  <===>  [2,2] 
== == push [6, 6] after node with idx: 5
 [3,3]  <===>  [1,1]  <===>  [5,5]  <===>  [6,6]  <===>  [2,2] 
== == remove last element
 [3,3]  <===>  [1,1]  <===>  [5,5]  <===>  [6,6] 
== == remove first element
 [1,1]  <===>  [5,5]  <===>  [6,6] 
== == remove element with idx: 5
 [1,1]  <===>  [6,6] 
== == remove element with idx: 6
 [1,1] 
== == remove element with idx:1
 []
**/
