/*
Example of Command Design Pattern 
*/

var GarageOpener = {
  _state: 'closed',
  open: function(){
    if (this._state === 'opened'){
      console.log('Garrage is already opened');
    } else {
      console.log('Garrage is opening');
      this._state = 'opened';
    }
  },
  close: function(){
    if (this._state === 'closed'){
      console.log('Garrage is already closed');
    } else {
      console.log('Garrage is closing');
      this._state = 'closed';
    }
  },
  execute: function(commandName){
    if (typeof this[commandName] === 'function'){
      this[commandName]();
    } else {
      console.log('Such API is not provided');
    }
  }
};

GarageOpener.execute('open'); //Garrage is opening 
GarageOpener.execute('close'); //Garrage is closing
GarageOpener.execute('close'); //Garrage is already closed
