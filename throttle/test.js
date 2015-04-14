var assert = require('assert');
var throttle = require('./');

describe('throttle', function() {
  it("won't execute more than once within the threshold", function(done) {
    var called = 0;
    var throttled = throttle(function() {
      called++;
    }, 10);
    throttled();
    throttled();
    throttled();
    setTimeout(function() {
      assert.equal(called, 1);
      done();
    }, 15);
  });

  it("will execute more than once outside the threshold", function(done) {
    var called = 0;
    var throttled = throttle(function() {
      called++;
    }, 10);
    throttled();
    setTimeout(throttled, 5);
    setTimeout(throttled, 20);
    setTimeout(function() {
      assert.equal(called, 2);
      done();
    }, 35);
  });

  it('gets called with context', function(done) {
    var ctx;
    var throttled = throttle(function() {
      ctx = this;
    }, 10);
    throttled.call(11);
    throttled.call(22);
    setTimeout(function() {
      assert.equal(ctx, 22);
      done();
    }, 15)
  });

  it('gets called with arguments', function(done) {
    var args;
    var throttled = throttle(function() {
      args = [].slice.call(arguments);
    }, 10);
    throttled(11, 22, 33);
    throttled(22, 33, 44);
    setTimeout(function() {
      assert.deepEqual(args, [22, 33, 44]);
      done();
    }, 15);
  });


});
