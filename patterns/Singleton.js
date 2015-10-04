/*
 * Usage:
 * database connection, creating one cashe object, configuration, etc
 * 
 * In this example I'm generating some random number and in every usage it will be the same
 */
var singletonRandom = (function(){
    var instance;
    var init = function(){
        var tmp = Math.random();
        return tmp;
    };
    return {
        getInstance: function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    };
})();

//examples
var random0 = singletonRandom.getInstance();
console.log('random0', random0); //random0 0.8312328624518267

var random1 = singletonRandom.getInstance();
console.log('random1', random1); //random1 0.8312328624518267


