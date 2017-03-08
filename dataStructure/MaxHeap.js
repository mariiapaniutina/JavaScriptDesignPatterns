var MaxHeap = function(){
  //our heap is going to start from 1 position
  this.heap = [null];
};

MaxHeap.prototype.insert = function(el){
  //inserting the element to the end of heap
  this.heap.push(el);

  var elPos = this.heap.length - 1;
  var elParentPos = this.getParentPosition(elPos);

  //while current element is bigger that its parent element, bubble up and swap
  while (elParentPos !== null && this.heap[elPos] > this.heap[elParentPos]){
    var tmp = this.heap[elPos];
    this.heap[elPos] = this.heap[elParentPos];
    this.heap[elParentPos] = tmp;

    //and update positions
    elPos = elParentPos;
    elParentPos = this.getParentPosition(elPos);
  }
};

MaxHeap.prototype.getRoot = function(){
  return this.heap[1];
};

MaxHeap.prototype.extractRoot = function(){
  //root always going to be on position 1.
  if (this.heap[1]){
    //saving element from position 1
    var root = this.heap[1];

    //now its time to update heap
    //take the latest element from heap
    var el = this.heap.pop();

    //put that to root
    this.heap.splice(1, 1, el);

    var currPos = 1;
    var leftCurrChild = this.getLeftChildPos(1);
    var rightCurrChild = this.getRightChildPos(1);

    //while root is smaller that its left or right child, bubble down and swap with biggest child
    while ((this.heap[currPos] && leftCurrChild !== null && this.heap[currPos] < this.heap[leftCurrChild]) ||
           (this.heap[currPos] && rightCurrChild !== null && this.heap[currPos] < this.heap[rightCurrChild])){
      //looking for its min child
      var max = Math.max(this.heap[rightCurrChild], this.heap[leftCurrChild]);
      var childPos = this.heap[rightCurrChild] === max ? rightCurrChild : leftCurrChild;

      //replace with that
      var tmp = this.heap[currPos];
      this.heap[currPos] = this.heap[childPos];
      this.heap[childPos] = tmp;

      //updating curr and its children positions
      currPos = childPos;
      leftCurrChild = this.getLeftChildPos(currPos);
      rightCurrChild = this.getRightChildPos(currPos);
    }

    return root;
  }

  //in case if heap is empty
  return null;
};

MaxHeap.prototype.getParentPosition = function(pos){
  var parentPos = Math.floor(pos/2);
  if (this.heap[parentPos] && this.heap[parentPos] !== null){
    return parentPos;
  }
  return null;
};

MaxHeap.prototype.getLeftChildPos = function(pos){
  var childPos = 2 * pos;
  if (this.heap[childPos]){
    return childPos;
  }
  return null;
};

MaxHeap.prototype.getRightChildPos = function(pos){
  var childPos = (2 * pos) + 1;
  if (this.heap[childPos]){
    return childPos;
  }
  return null;
};

MaxHeap.prototype.getHeap = function(){
  return this.heap;
};

module.exports = MaxHeap;

//testing
var maxHeap = new MinHeap();
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(20);
maxHeap.insert(2);
maxHeap.insert(15);
maxHeap.insert(19);
maxHeap.insert(50);
maxHeap.insert(30);

console.log('heap is', maxHeap.getHeap()); // [ null, 50, 30, 20, 15, 5, 10, 19, 2 ]

maxHeap.extractRoot(); //50
console.log('heap is', maxHeap.getHeap()); // [ null, 30, 15, 20, 2, 5, 10, 19 ]

maxHeap.extractRoot(); //30
console.log('heap is', maxHeap.getHeap()); // [ null, 20, 15, 19, 2, 5, 10 ]
