module.exports = function (func, time) {
  var start = new Date();
  var i = 0;
  return function() {
    var now = new Date();
    if (now - start >= time || i === 0 ) {
      func.apply(this, arguments);
      i++;
    }
  }
};
