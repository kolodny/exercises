var assert = require('assert');
var flattenThunk = require('./');

describe('flattenThunk', function() {

  it('flattens the promises', function(done) {

    var thunk1 = function(cb) {
      setTimeout(function() {
        cb(null, 'done');
      }, 1);
    }
    var thunk2 = function(cb) {
      setTimeout(function() {
        cb(null, thunk1);
      }, 1);
    }
    var thunk3 = function(cb) {
      setTimeout(function() {
        cb(null, thunk2);
      }, 1);
    }

    flattenThunk(thunk3)(function(err, result) {
      assert.equal(result, 'done');
      done();
    });
  });


});
