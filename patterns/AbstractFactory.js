var helpers = {
  getAllItemts: function(arr){
    var str = '';
    for (var i=0; i<arr.length; i++){
      if (i !== arr.length-1){
        str += arr[i] + ', ';
      } else {
        str += arr[i];
      }
      
    }
    return str;
  }
};


var companyFactory1 = (function(){
  
  var createManager = function(){
    var items = ['macbook air', 'notebook', 'mobile phone'];
    return console.log('companyFactory1 :: Manager was added with such items: ' + helpers.getAllItemts(items));
    
  };
  
  var createDeveloper = function(){
    var items = ['macbook pro'];
    return console.log('companyFactory1 :: Developer was added with such items: ' + helpers.getAllItemts(items));
  };
  
  return {
    createManager: createManager,
    createDeveloper: createDeveloper
  }
})();

var companyFactory2 = (function(){
  
  var createManager = function(){
    var items = ['chromebook', 'notebook', 'pen'];
    return console.log('companyFactory2 :: Manager was added with such items: ' + helpers.getAllItemts(items));
    
  };
  
  var createDeveloper = function(){
    var items = ['asus zendbook', 'whiteboard'];
    return console.log('companyFactory2 :: Developer was added with such items: ' + helpers.getAllItemts(items));
  };
  
  return {
    createManager: createManager,
    createDeveloper: createDeveloper
  }
})();

companyFactory1.createManager();
companyFactory1.createDeveloper();

companyFactory2.createManager();
companyFactory2.createDeveloper();

/*
companyFactory1 :: Manager was added with such items: macbook air, notebook, mobile phone
companyFactory1 :: Developer was added with such items: macbook pro
companyFactory2 :: Manager was added with such items: chromebook, notebook, pen
companyFactory2 :: Developer was added with such items: asus zendbook, whiteboard
*/
