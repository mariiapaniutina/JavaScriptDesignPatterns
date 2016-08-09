/*
Adapter pattern allows the interface of an existing class to be used from another class.
Example below.
*/

//Old code was provided by third party
var Transaction = function(info){
  var transactionAmount = 'Transaction amount is :: ' + info.amount;
  var transactionProcessingTime = 'Processing time is :: ' + info.time;
  var CA_TAX = 0.09;
  
  this.getTransaction = function(){
    console.log('Transaction :: getTransaction');
    console.log(transactionAmount);
    console.log(transactionProcessingTime);
    
    return (+info.amount * CA_TAX) + +info.amount;
  };

};

//Trird party decided to change/update getTransaction method
var SecuredTransaction = function(loggedOptions, transactionInfo){
  var isLoggedIn = loggedOptions ? 'User is logged in' : 'User is not logged in';
  var transactionAmount = 'Transaction amount is :: ' + transactionInfo.amount;
  var transactionProcessingTime = 'Processing time is :: ' + transactionInfo.time;
  
  var FEDERAL_TAX = 0.11;
  
  this.getSecuredTransaction = function(){
    console.log('SecuredTransaction :: getSecuredTransaction');
    console.log(isLoggedIn);
    console.log(transactionAmount);
    console.log(transactionProcessingTime);
    
    return (+transactionInfo.amount * FEDERAL_TAX) + +transactionInfo.amount;
  };

};

//our adapter
var TransactionAdapter = function(loggedOptions, transactionInfo){
  var trns = new SecuredTransaction(loggedOptions, transactionInfo);
  
    this.getTransaction = function(){
      return trns.getSecuredTransaction();
    };
};

var getOutput = function(options){
  return console.log(options);
};

//Usage
var trns = {
  amount: '22.56',
  time: '2016-04-15 14:00:00'
};
var loggedIn = true;

var currentTransaction = new Transaction(trns);
var adapter = new TransactionAdapter(loggedIn, trns);

//get old, not updated transaction
getOutput(currentTransaction.getTransaction());
//Transaction :: getTransaction
//Transaction amount is :: 22.56
//Processing time is :: 2016-04-15 14:00:00
//24.5904

//get new, updated, adapted transaction
getOutput(adapter.getTransaction());
SecuredTransaction :: getSecuredTransaction
//User is logged in
//Transaction amount is :: 22.56
//Processing time is :: 2016-04-15 14:00:00
//25.0416
