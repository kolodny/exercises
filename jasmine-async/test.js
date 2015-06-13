var inject = (function() {
  var assert = require('assert');
  var testCase;
  var thingsToDo = [];
  var runs = function(runFn) {
    thingsToDo.push({type: 'run', todo: runFn});
  };
  var waitsFor = function(waitsForFn) {
    thingsToDo.push({type: 'waitsFor', todo: waitsForFn});
  };
  var it = function(desc, fn) {
    testCase = {
      desc: desc,
      fn: fn
    };
    
  };
  module.exports.run = function (cb){
    assert(testCase, "It not called at all");
    testCase.fn();
    assert.equal(thingsToDo.length, 3, 'Not using runs and waitsFor properly');
    assert.equal(thingsToDo[0].type, 'run');
    assert.equal(thingsToDo[1].type, 'waitsFor');
    assert.equal(thingsToDo[2].type, 'run');
    thingsToDo[0].todo();
    next();
    function next() {
      if (thingsToDo[1].todo()) {
        thingsToDo[2].todo();
        cb();
      } else {
        setTimeout(next, 1);
      }
    }

  }

}).toString().split('\n').slice(1, -1).join('\n');

var assert = require('assert');
var fs = require('fs');
var indexContents = fs.readFileSync(__dirname + '/index.js').toString();
fs.writeFileSync(__dirname + '/index__TMP__.js', indexContents + inject);
var jasmineAsync = require(__dirname + '/index__TMP__.js');
fs.unlinkSync(__dirname + '/index__TMP__.js');

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
        }
      };
    });

    jasmineAsync.run(done);

  });

});
