var assert = require('assert');
var once = require('./');

describe('once', function() {
  it("won't execute more than once", function() {
    var called = 0;
    var init = once(function() {
      return ++called;
    });
    init();
    init();
    init();
    assert.equal(called, 1);
  });

  it('will return the value from the original call for later calls', function() {
    var t = 10;
    var init = once(function() {
      return ++t;
    });
    var ret = init();
    assert.deepEqual(init(), ret);
    assert.deepEqual(init(), ret);
  });

  it('gets called with context', function() {
    var ctx;
    var init = once(function() {
      ctx = this;
    });
    init.call(11);
    init.call(22);
    assert.equal(ctx, 11);
  });

  it('gets called with arguments', function() {
    var args;
    var init = once(function() {
      args = [].slice.call(arguments);
    });
    init(11, 22, 33);
    init(22, 33, 44);
    assert.deepEqual(args, [11, 22, 33]);
  });
});
