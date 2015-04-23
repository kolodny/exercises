var inject = (function() {
  var assert = require('assert');
  var thingsToDo = [];
  var runs = function(runFn) {
    thingsToDo.push({type: 'run', todo: runFn});
  };
  var waitsFor = function(waitsForFn) {
    thingsToDo.push({type: 'waitsFor', todo: waitsForFn});
  };
  var it = function(desc, fn) {
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
          done();
        }
      };
    })

  });

});
