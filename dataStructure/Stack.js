var Stack = function(){
  this.size = 0;
  this.data = [];
};

Stack.prototype.push = function(value){
  this.data[this.size] = value;
  this.size++;
};

Stack.prototype.pop = function(){
  var el = this.data[this.size];
  if(this.size > 0){
    this.size--;
    this.data.length = this.size;
  }else {
    this.data = [];
  }
  return el;
};
