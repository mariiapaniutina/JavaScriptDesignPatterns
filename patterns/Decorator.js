/*
Decorator takes a function(s) as argument and returns an function, 
which extends behavior or add new functionality to input function.
*/

/*
Example of Decorator is caching.
*/
var memoDecorator = function(fn){
  var cache = {};
  return function(){
    var args = Array.prototype.slice.call(arguments);
    var param = JSON.stringify(arguments);
    if(cache[param] === undefined){
      cache[param] = fn.apply(this, args);
    }
    return cache[param];
  };
};

var fib = memoDecorator(function(n){
  if(n == 0 || n == 1){
    return n;
  }
  return fib(n-1) + fib(n-2);
});

console.time('first call');
fib(40);
console.timeEnd('first call');
//first call: 0.79ms

console.time('second call');
fib(40);
console.timeEnd('second call');
//second call: 0.04ms

console.time('third call');
fib(40);
console.timeEnd('third call');
//third call: 0.04ms
