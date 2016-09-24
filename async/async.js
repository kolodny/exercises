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
      var method = fns[index];
      if (!method) {
        return finalCallback(null, data);
      }
      // Increment index
      index++;
      // Execute the next method, passing along the data
      return method(next, data);
    };
  };
};

exports.parallel = function(fns) {
  return function(finalCallback) {
    // A counter to verify that all functions complete
    var finished = 0;
    // Initialize an array that will store the final result
    // for each of the functions in the same order that they
    // are in when passed as a parameter.
    var finalResult = new Array(fns.length);
    // We can use a forEach here, because we are starting the
    // given functions synchronously for them to operate in parallel
    fns.forEach(function(fn, index) {
      return fn(function(err, data) {
        if (err) {
          // On error, immediately call final callback
          return finalCallback(err, null);
        }
        finished++;
        // Set the result of this particular function in the
        // final result object
        finalResult[index] = data;
        // When all functions are complete, invoke the final callback
        if (finished === fns.length) {
          return finalCallback(null, finalResult);
        }
      })
    });
  };
};

exports.race = function(fns) {
  return function(finalCallback) {
    var complete = false;
    // We can use a forEach here, because we are starting the
    // given functions synchronously for them to operate in parallel
    fns.forEach(function(fn, index) {
      return fn(function(err, data) {
        if (complete) {
          // The race is already won, this result doesn't matter
          return;
        }
        // The race is over, set the complete flag
        complete = true;
        // Invoke the final callback with any error or data from
        // the winning function
        return finalCallback(err, data);
      })
    });
  };
};
