var assert = require('assert');
var value = require('./');

describe('value', function() {

  it('works on simple values', function() {
    assert.equal(value(2), 2);
  });

  it('works on functions', function() {
    var fn = function() { return 3; };
    assert.equal(value(fn), 3);
  });

  it('works on nested functions', function() {
    var fn = function() { return function() { return 4; }; };
    assert.equal(value(fn), 4);
  });

  it('works on nested functions WOW!', function() {
    var fn = function() { return function() { return function() { return 5; }; }; };
    assert.equal(value(fn), 5);
  });

});
