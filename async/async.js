exports.sequence = function(fns) {
  return function(finalCallback) {
    var index = 0;
    // Kick off the loop
    next();
    // Inner callback for functions in the sequence
    function next(err, data) {
      if (err) {
        // On error, break sequence and call final callback
        return finalCallback(err, null);
      }
      // Call the next function in the sequence, unless there are no more,
      // in which case call the final callback
      var method = fns[index] || finalCallback;
      // Increment index
      index++;
      // Execute the next method, passing along the data
      return method(next, data);
    };
  };
};

exports.parallel = function(fns) {
  return function(callback) {

  };
};

exports.race = function(fns) {
  return function(callback) {

  };
};
