var assert = require('assert');
var curry = require('./');

describe('curry', function() {

  it('curries the function at least once', function() {
    var add = curry(function(a, b) {
      return a + b;
    });
    assert.equal(add(1)(2), 3);
  });

  it('curries the function until the arguments needed are given at least once', function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1, 2)(3), 6);
  });

  it('curries the function until the arguments needed are given mutliple times', function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1)(2)(3), 6);
  });

  it("doesn't share state between calls", function() {
    var add = curry(function(a, b, c) {
      return a + b + c;
    });
    assert.equal(add(1)(2)(3), 6);
    assert.equal(add(1)(2)(3), 6);
  });


});
