var helpers = {
  mixin: function(target, source, methods){
    for (var i=0; i< methods.length; i++){
      if (target[methods[i]] === undefined){
        target[methods[i]] = source[methods[i]];
      }
    }
  }
};

var hello = {
  sayName: function(){
    return console.log('My name is ' + this.name);
  }
}

var Person = function(name){
  this.name = name;
};

var PC = function (name){
  this.name = name;
};

helpers.mixin(Person.prototype, hello, ["sayName"]);
helpers.mixin(PC.prototype, hello, ["sayName"]);

var me = new Person("Mariia");
me.sayName(); //My name is Mariia

var mac = new PC("MacBook PRO");
mac.sayName(); //My name is MacBook PRO
