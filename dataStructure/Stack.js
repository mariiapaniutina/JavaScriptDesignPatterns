var Stack = function(){
  this.size = 0;
  this.arr = [];
};

Stack.prototype.push = function(value){
  this.arr[this.size] = value;
  this.size++;
};

Stack.prototype.pop = function(){
   var el = this.arr[this.size]
  if(this.size > 0){
    this.size--;
    this.arr.length = this.size;
  }else {
    this.size = 0;
    this.arr = [];
  }
  return el;
};
