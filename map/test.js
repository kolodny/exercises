var assert = require('assert');
require('./')();

describe('Array.prototype._map', function() {
  describe('should not', function() {
    it('use the default .map function inside', function() {
      Array.prototype.map = null;
      assert.doesNotThrow(
        function() {
          [1]._map(function() {});
        }
      );
    });
  });

  it('should be a function', function() {
    assert.equal(typeof Array.prototype._map, 'function');
  });

  it('should return another array', function() {
    var arr = [1, 2, 3];
    var ret = arr._map(function() {});

    assert.notEqual(arr, ret);
  });

  it('should return the right results', function() {
    var arr = [1, 2, 3];
    var ret = arr._map(function(value) {
      return value * 2;
    });

    assert.deepEqual(ret, [2, 4, 6]);
  });

  it('callback will be called once for each element', function() {
    var called = 0;
    var arr = [1, 2, 3];

    arr._map(function(value) {
      called++;
      return value;
    });

    assert.equal(called, 3);
  });

  it('callback will be invoked only for indexes which have assigned values', function() {
    var called = 0;
    var arr = [1, 'text', true, null, undefined, [], {}];
    delete arr[0];

    arr._map(function(value) {
      called++;
      return value;
    });

    assert.equal(called, 6);
  });

  it('callback will be invoked with three arguments', function() {
    var args;
    var arr = [1];

    arr._map(function() {
      args = arguments.length;
    });

    assert.equal(args, 3);
  });

  it("callback's arguments (value, index, array) should have right values", function() {
    var i = 0;
    var arr = [1, 2, 3];

    arr._map(function(value, index, array) {
      assert.equal(value, arr[i]);
      assert.equal(index, i);
      assert.deepEqual(arr, array);
      i++;
    });
  });

  it('callback should gets called with context', function() {
    var ctx;
    var arr = [5];

    arr._map(function() {
      ctx = this;
    }, 3);

    assert.equal(ctx, 3);
  });
});
