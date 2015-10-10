/**
 * Created by harry on 15/10/10.
 */

/**
 * implement without promise
 * @type {{sequence: Function, parallel: Function, race: Function}}
 */

module.exports = {
  /**
   * call functions one by one, and pass return data as argument to next function
   * and the data passing to callback is the last function return data
   * @param funcs
   * @returns {Function}
   */
  sequence : function(funcs){
    funcs = funcs || [];
    return function (cb) {
      (function(err, data){
        var callee = arguments.callee;
        if(funcs.length == 0){
          cb(err, data)
        }else{
          funcs.shift().call(null, function (err, data) {
            callee.call(null, err, data);
          }, data);
        }
      })(null, null);
    }
  },

  /**
   * call all functions at the same time,
   * and save the return data into an array in right position where the func belong
   * @param funcs
   * @returns {Function}
   */
  parallel : function(funcs){
    funcs = funcs || [];
    var len = funcs.length;
    var process = 0;
    var datas = [];
    var errors = [];
    return function (cb) {
      if(len > 0) {
        for (var i = 0; i < len; i++) {
          (function (index) {
            funcs[index](function (err, data) {
              process++;
              datas[index] = data;
              errors[index] = err;
              if (process == len) {
                cb(errors, datas);
              }
            });
          })(i);
        }
      }else{
        cb(errors, datas);
      }
    }
  },

  /**
   * call the functions, and callback the return data which return quickly
   * @param funcs
   * @returns {Function}
   */
  race : function(funcs){
    funcs = funcs || [];
    var len = funcs.length;
    var win;
    return function (cb) {
      if(len > 0) {
        for (var i = 0; i < len; i++) {
          (function (index) {
            funcs[index].call(null, function (err, data) {
              if(typeof win == "undefined"){
                win = index;
                cb(err, data);
              }
            });
          })(i);
        }
      }else{
        cb(null, null);
      }
    }
  }
};
