var assert = require('assert');
var async = require('./');

describe('async', function() {

  describe('has a sequence method that', function() {
    it('runs functions in sequence', function(done) {
      var fun1 = function(cb) {
        setTimeout(cb.bind(null, null, 'test'), 10);
      };
      var fun2 = function(cb, data) {
        setTimeout(cb.bind(null, null, data + 'ing'), 10);
      };

      // returns a thunk
      async.sequence([fun1, fun2])(function(err, data) {
        assert.equal(data, 'testing');
        done();
      });
    });

    it('correctly handles sync functions in sequence', function(done) {
      var fun1 = function(cb) {
        cb(null, 'test1');
      };
      var fun2 = function(cb, data) {
          cb(null, data);
      };

      // returns a thunk
      async.sequence([fun1, fun2])(function(err, data) {
        assert.equal(data, 'test1');
        done();
      });
    });

    it('handles delayed thunk invocation', function(done) {
      var fun1 = function(cb) {
        cb(null, 'test2');
      };
      var fun2 = function(cb, data) {
        cb(null, data.toUpperCase());
      };

      // returns a thunk
      var setter = async.sequence([fun1, fun2])

      setTimeout(function() {
        setter(function(err, data) {
          assert.equal(data, 'TEST2');
          done();
        });
      }, 100)
    });
  });

  describe('has a parallel method that', function() {
    it('runs functions in parallel', function(done) {
      var fun1 = function(cb) {
        setTimeout(cb.bind(null, null, 'test'), 10);
      };
      var fun2 = function(cb) {
        setTimeout(cb.bind(null, null, 'ing'), 10);
      };

      // returns a thunk
      async.parallel([fun1, fun2])(function(err, data) {
        assert.deepEqual(data, ['test', 'ing']);
        done();
      });
    });
  });

  describe('has a race method that', function() {
    it('uses the first completing function', function(done) {
      var fun1 = function(ms) {
        return function(cb) {
          setTimeout(cb.bind(null, null, 'test'), ms);
        };
      };
      var fun2 = function(ms) {
        return function(cb) {
          setTimeout(cb.bind(null, null, 'ing'), ms);
        };
      };

      // returns a thunk
      async.race([fun1(10), fun2(20)])(function(err, data) {
        assert.equal(data, 'test');
        async.race([fun1(20), fun2(10)])(function(err, data) {
          assert.equal(data, 'ing');
          done();
        });

      });
    });
  });

});
