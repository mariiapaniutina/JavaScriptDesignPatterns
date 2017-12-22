/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    
    //map for storing key and referance to list
    this.map = {};
    
    //conctructor for Doubly Linked List
    DLinkedList = function(){
        this.Node = function(key, val){
            this.val = val;
          this.key = key;
            this.next = null;
            this.prev = null;
        };
  
        this.size = 0;
        this.head = null;
        this.tail = null;
    };

    DLinkedList.prototype.addFront = function(key, val){
        var node = new this.Node(key, val);
        //console.log('==addFront :: val', val);
        //console.log('==addFront :: this.size', this.size);

        if (this.size === 0){
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        
        this.size++;
        return node;
    };

    DLinkedList.prototype.addTail = function(key, val){
        var node = new this.Node(key, val);
  
        if (this.size === 0){
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
  
        this.size++;
        return node;
    };
  
    DLinkedList.prototype.getTail = function(){
        return this.tail;
    };

    DLinkedList.prototype.removeNode = function(node){
        var prev = node.prev;
        var next = node.next;
  
        //if this is tail
        if (node.next === null){
          //console.log('==remove tail');
          this.tail = node.prev;
          this.tail.next = null;  
        // if this is head
        } else if (node.prev === null){
            //console.log('==remove head');
            this.head = next;
            this.head.prev = null;
        } else {
          //console.log('==remove in middle');
            prev.next = next;
        }
  
        if (this.size > 0){
            this.size--;
        }
    };
    
    DLinkedList.prototype.getSize = function(){
        return this.size;
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
    
    this.list = new DLinkedList();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    //check if this is present in map
    if (this.map[key]){
        //remove from list
        var node = this.map[key];
        this.list.removeNode(node);
        //and add onfront
        this.list.addFront(key, node.val);
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    //console.log('==put');
    //if we have room for putting element
    if  (this.list.getSize() < this.capacity){
        //console.log('==put :: size < capacity');
        var node = this.list.addFront(key, value);
        this.map[key] = node;
    } else {
        //removing last
        //console.log('==put :: no room');
        var lastNode = this.list.getTail();
        this.list.removeNode(lastNode);
        delete this.map[lastNode.key]; 
        var nodeToAdd = this.list.addFront(key, value);
        this.map[key] = nodeToAdd;
    }
};

LRUCache.prototype.str = function(){
  return this.list.getStringifiedData();
};

var cache = new LRUCache(2);

cache.put(1, 1);
cache.str();

cache.put(2, 2);
cache.str();

cache.get(1); 
cache.str();

cache.put(3, 3);    // evicts key 2
cache.str();

cache.get(2);       // returns -1 (not found)
cache.str();

cache.put(4, 4);    // evicts key 1
cache.str();

cache.get(1);       // returns -1 (not found)
cache.str();

cache.get(3);       // returns 3
cache.str();

cache.get(4);       // returns 4
cache.str();
