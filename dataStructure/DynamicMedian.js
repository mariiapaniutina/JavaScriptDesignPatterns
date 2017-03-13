var MaxHeap = require('./ds/maxHeap.js');
var MinHeap = require('./ds/minHeap.js');

var DynamicMedian = function(){
  this.medians = [];
  this.leftHeap = new MaxHeap();
  this.rightHeap = new MinHeap();
};

DynamicMedian.prototype.insert = function(el){
  if (this.medians.length === 0){
    this.medians.push(el);
    this.leftHeap.insert(el);

    //returning current median as element
    return el;
  }

  var currMedian = this.medians[this.medians.length - 1];

  if (el >= currMedian){
    this.rightHeap.insert(el);
  } else {
    this.leftHeap.insert(el);
  }

  var heapsLenDiff = this.leftHeap.getHeap().length - this.rightHeap.getHeap().length;

  if (heapsLenDiff > 1){
    this.rightHeap.insert(this.leftHeap.extractRoot());
  } else if (heapsLenDiff < 0) {
    this.leftHeap.insert(this.rightHeap.extractRoot());
  }

  this.medians.push(this.leftHeap.getRoot());

  //returning current median
  return this.medians[this.medians.length - 1];
};

DynamicMedian.prototype.getMedian = function(){
  return this.medians[this.medians.length - 1];
};

DynamicMedian.prototype.getMedianSum = function(){
  return this.medians.reduce(function(a, b){
    return a + b;
  })
};
