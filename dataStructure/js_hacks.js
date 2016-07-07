//Methods chain
var Person = function(name, city){
  this.name = name;
  this.city = city;
};

Person.prototype.getName = function(){
  console.log('My name is:', this.name);
  return this;
};

Person.prototype.getCity = function(){
  console.log('My city is:', this.city);
  return this;
};

var me = new Person('Mariia', 'San Jose');
me.getName().getCity();
