var assert = require('assert');

var NativeMap = Array.prototype.map;
var calledNativeMap;
Array.prototype.map = function() {
  calledNativeMap = true;
  return NativeMap.apply(this, arguments);
}

var map = require('./');



describe('map', function() {

  it('should not use the native map', function() {
    calledNativeMap = false;
    map(['x'], function(x) { return x; });
    assert(!calledNativeMap);
  });

  it('should return another array', function() {
    var arr = [1, 2, 3];
    var mapped = map(arr, function() {});

    assert.notEqual(arr, mapped);
  });

  it('should return the right results', function() {
    var arr = [1, 2, 3];
    var mapped = map(arr, function(value) {
      return value * 2;
    });

    assert.deepEqual(mapped, [2, 4, 6]);
  });

  it('callback will be called once for each element', function() {
    var called = 0;
    var arr = [1, 2, 3];

    map(arr, function(value) {
      called++;
      return value;
    });

    assert.equal(called, 3);
  });

  it('callback will be invoked with three arguments', function() {
    var args;
    var arr = [1];

    map(arr, function() {
      args = arguments.length;
    });

    assert.equal(args, 3);
  });

  it("callback's arguments (value, index, array) should have right values", function() {
    var i = 0;
    var arr = [1, 2, 3];

    map(arr, function(value, index, array) {
      assert.equal(value, arr[i]);
      assert.equal(index, i);
      assert.deepEqual(arr, array);
      i++;
    });
  });

  it('callback should gets called with context', function() {
    var ctx;
    var arr = [5];

    map(arr, function() {
      ctx = this;
    }, 3);

    assert.equal(ctx, 3);
  });
});
