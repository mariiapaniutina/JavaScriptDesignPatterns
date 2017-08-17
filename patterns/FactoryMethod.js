/*
 Pattern Factory
 Real example of Factory Method = new Object(); because if argument is number it creates Number(), 
 if string - creates String()
*/

function Element(){
  
  var el;
  
  var Dot = function(){
    this.data = 'Small "."';
  };
  
  var Circle = function(){
    this.data = 'Red circle "o"';
  };
  
  var Triangle = function (){
    this.data = 'Blue triangle "/_\\"';
  };
  
  this.create = function(type){
    if(type == 'circle'){
      el = new Circle();
    } else if(type == 'triangle'){
      el = new Triangle();
    } else {
      el = new Dot();
    }
    
    el.sayData = function(){
      return this.data + ' was created!';
    }
    
    return el;
  }
  
};

var graphElements = new Element();

var c = graphElements.create('circle');
console.log('c', c.sayData()); //c Red circle "o" was created!

var t = graphElements.create('triangle');
console.log('t', t.sayData()); //t Blue triangle "/_\" was created!

var m = graphElements.create();
console.log('m', m.sayData()); //m Small "." was created!
