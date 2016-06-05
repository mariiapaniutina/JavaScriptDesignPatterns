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


/*
One more example is debounce function.
On current example, if callback has not been called at least once within an timeer, 
it will call the latest one
*/
var sayLetter = function(letter){
	return console.log('I think this is letter ' + letter);
};

var helper = {};
helper.debouncer = function(fn, timer){
  var time = new Date().getTime();
  var stack = [];
  var fnCalled = false;
  
	return function(){
		var args = arguments;
    var context = this;
    var currTime = new Date().getTime();
    stack.push(args);
    
    if ((currTime - time >= timer)){
      time = currTime;
      fnCalled = true;
      return fn.apply(context, args);
    }
    
    setTimeout(function(){
      if (fnCalled === false){
        fnCalled = true;
        return fn.apply(context, stack[stack.length-1]);
      }
    }, timer);
    
	};
};

var testIt = helper.debouncer(sayLetter, 100);

testIt('A');
testIt('B');
testIt('C');
testIt('D');
testIt('F');

//I think this is letter F
