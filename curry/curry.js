'use strict';
var toArray = function(args){
	return Array.prototype.slice.call(args,0);
}

var sub_curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    console.log(args);
    console.log(toArray(arguments));
    return function () {
        return fn.apply(this, args.concat(toArray(arguments)));
    };
}

var curry = function(fn, length){
	length = length || fn.length;
	return function(){
		if(arguments.length<length){
			var combined = [fn].concat(toArray(arguments));
			return length - arguments.length>0?curry(sub_curry.apply(this,combined), length-arguments.length):sub_curry.call(this, combined);
		}else{
			return fn.apply(this,arguments);
		}
	};
}

module.exports = curry;