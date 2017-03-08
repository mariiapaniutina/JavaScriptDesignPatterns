var MinHeap = function(){
  //our heap is going to start from 1 position
  this.heap = [null];
};

MinHeap.prototype.insert = function(el){
  //inserting the element to the end of heap
  this.heap.push(el);

  var elPos = this.heap.length - 1;
  var elParentPos = this.getParentPosition(elPos);

  //while current element is smaller that its parent element, bubble up and swap
  while (elParentPos !== null && this.heap[elPos] < this.heap[elParentPos]){
    var tmp = this.heap[elPos];
    this.heap[elPos] = this.heap[elParentPos];
    this.heap[elParentPos] = tmp;

    //and update positions
    elPos = elParentPos;
    elParentPos = this.getParentPosition(elPos);
  }
};

MinHeap.prototype.getRoot = function(){
  return this.heap[1];
};

MinHeap.prototype.extractRoot = function(){
  //root always going to be on position 1.
  if (this.heap[1]){
    //saving element from position 1
    var root = this.heap[1];

    //now its time to update heap
    //take the latest element from heap
    var el = this.heap.pop();

    //put that to root with removing prev root
    this.heap.splice(1, 1, el);

    var currPos = 1;
    var leftCurrChild = this.getLeftChildPos(1);
    var rightCurrChild = this.getRightChildPos(1);

    //while root is bigger that its left or right child, bubble down and swap with smallest child
    while ((this.heap[currPos] && leftCurrChild !== null && this.heap[currPos] > this.heap[leftCurrChild]) ||
    (this.heap[currPos] && rightCurrChild !== null && this.heap[currPos] > this.heap[rightCurrChild])){
      //looking for its min child
      var min = Math.min(this.heap[rightCurrChild], this.heap[leftCurrChild]);
      var childPos = this.heap[rightCurrChild] === min ? rightCurrChild : leftCurrChild;

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

MinHeap.prototype.getParentPosition = function(pos){
  var parentPos = Math.floor(pos/2);
  if (this.heap[parentPos] && this.heap[parentPos] !== null){
    return parentPos;
  }
  return null;
};

MinHeap.prototype.getLeftChildPos = function(pos){
  var childPos = 2 * pos;
  if (this.heap[childPos]){
    return childPos;
  }
  return null;
};

MinHeap.prototype.getRightChildPos = function(pos){
  var childPos = (2 * pos) + 1;
  if (this.heap[childPos]){
    return childPos;
  }
  return null;
};

MinHeap.prototype.getHeap = function(){
  return this.heap;
};

module.exports = MinHeap;

// testing
var minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(20);
minHeap.insert(2);
minHeap.insert(15);
minHeap.insert(19);
minHeap.insert(50);
minHeap.insert(30);

console.log('heap is', minHeap.getHeap()); // [ null, 2, 5, 19, 10, 15, 20, 50, 30 ]

minHeap.extractRoot(); //2
console.log('heap is', minHeap.getHeap()); // [ null, 5, 10, 19, 30, 15, 20, 50 ]

minHeap.extractRoot(); //5
console.log('heap is', minHeap.getHeap()); // [ null, 10, 15, 19, 30, 50, 20 ]
