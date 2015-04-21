var assert = require('assert');
var jasmineAsync = require('./');

var mochaIt = it;

describe('jasmineAsync', function() {

  mochaIt('wraps the async weirdness', function(done) {

    jasmineAsync(function() {
      var test = 0;
      return {
        desc: 'a test',
        setup: function(doneJasmine) {
          setTimeout(function() {test++;}, 5);
          setTimeout(doneJasmine, 10);
          setTimeout(function() {test++;}, 20);
        },
        test: function() {
          assert.equal(test, 1);
          done();
        }
      };
    })

  });

});

it = function(desc, fn) {
  var thingsToDo = [];
  global.runs = function(runFn) {
    thingsToDo.push({type: 'run', todo: runFn});
  };
  global.waitsFor = function(waitsForFn) {
    thingsToDo.push({type: 'waitsFor', todo: waitsForFn});
  };
  fn();
  assert.equal(thingsToDo[0].type, 'run');
  assert.equal(thingsToDo[1].type, 'waitsFor');
  assert.equal(thingsToDo[2].type, 'run');
  thingsToDo[0].todo();
  next();
  function next() {
    if (thingsToDo[1].todo()) {
      thingsToDo[2].todo();
    } else {
      setTimeout(next, 1);
    }
  }
};
