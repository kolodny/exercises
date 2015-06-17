var assert = require('assert');
var debounce = require('./');

describe('debounce', function() {
  it('waits for the threshold to pass before executing', function(done) {
    var now = new Date();
    var debounced = debounce(function() {
      assert(new Date() - now >= 10);
      done();
    }, 10);
    debounced();
  });

  it("won't execute more than once within the threshold", function(done) {
    var called = 0;
    var debounced = debounce(function() {
      called++;
    }, 10);
    debounced();
    debounced();
    debounced();
    setTimeout(function() {
      assert.equal(called, 1);
      done();
    }, 15);
  });

  it("will execute more than once outside the threshold", function(done) {
    var called = 0;
    var debounced = debounce(function() {
      called++;
    }, 10);
    debounced();
    setTimeout(debounced, 5);
    setTimeout(debounced, 20);
    setTimeout(function() {
      assert.equal(called, 2);
      done();
    }, 45);
  });

  it('gets called with context', function(done) {
    var ctx;
    var debounced = debounce(function() {
      ctx = this;
    }, 10);
    debounced.call(11);
    debounced.call(22);
    setTimeout(function() {
      assert.equal(ctx, 22);
      done();
    }, 15)
  });

  it('gets called with arguments', function(done) {
    var args;
    var debounced = debounce(function() {
      args = [].slice.call(arguments);
    }, 10);
    debounced(11, 22, 33);
    debounced(22, 33, 44);
    setTimeout(function() {
      assert.deepEqual(args, [22, 33, 44]);
      done();
    }, 15);
  });


});
