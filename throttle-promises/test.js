var assert = require('assert');
var throttlePromises = require('./');

describe('throttle-promises', function() {
  it("doesn't run more than `limit` promises in parallel", function(done) {
    var passed = true;
    var limit = 5;
    var currentlyExecuting = 0;
    var currentlyExecutingHistory = [currentlyExecuting];
    var nextValue = 0;
    var asyncFactory = function() {
      return new Promise(function(resolve) {
        var resolveWith = nextValue++;
        currentlyExecuting++;
        currentlyExecutingHistory.push(currentlyExecuting);
        if (currentlyExecuting > limit) {
          passed = false;
        }
        setTimeout(function() {
          resolve(resolveWith + '!');
          currentlyExecuting--;
          currentlyExecutingHistory.push(currentlyExecuting);
        }, Math.random() * 100);
      });
    };

    var arr = [];
    for (var i = 0; i < 100; i++) {
      arr.push(asyncFactory);
    }

    throttlePromises(5, arr).then(function(results) {
      var expectedResults = Array(101).join('.').split('').map(function(dot, index) {
        return index + '!';
      });
      var expectedHistory = Array(202).join('.').split('').map(function(dot, index) {
        return index < 5 ? index : index >= 200 - 5 ? 200 - index : index % 2 ? 5 : 4;
      });

      assert(passed, 'more than ' + limit + ' promises ran in parallel');
      assert.deepEqual(results, expectedResults);
      assert.deepEqual(currentlyExecutingHistory, expectedHistory);
      done();
    });


  });
});
