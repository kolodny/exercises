var assert = require('assert');
var flatten = require('./');

describe('flatten', function() {
  var arr = [1, [2], [3, 4, [5]]];

  it('will return another array', function() {
    assert.notEqual(flatten(arr), arr);
  });

  it('will flatten an array recursively', function() {
    assert.deepEqual(flatten(arr), [1, 2, 3, 4, 5]);
  });

  it('will flatten an array a single level', function() {
    assert.deepEqual(flatten(arr, true), [1, 2, 3, 4, [5]]);
  });
});
