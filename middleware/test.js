var assert = require('assert');
var Middleware = require('./');

describe('middleware', function() {
  it('works with a single instance', function(done) {

    var middleware = new Middleware();

    middleware.use(function(next) {
      var ctx = this;
      setTimeout(function() {
        ctx.first = true;
        next();
      }, 10);
    });

    middleware.use(function(next) {
      var ctx = this;
      setTimeout(function() {
        ctx.second = true;
        next();
      }, 10);
    });

    middleware.go(function() {
      assert.equal(this.first, true);
      assert.equal(this.second, true);
      done();
    });
  });





  it('works with multiple instances', function(done) {

    var middleware1 = new Middleware();
    var middleware2 = new Middleware();

    middleware1.use(function(next) {
      var ctx = this;
      setTimeout(function() {
        ctx.first = true;
        next();
      }, 10);
    });

    middleware2.use(function(next) {
      var ctx = this;
      setTimeout(function() {
        ctx.second = true;
        next();
      }, 10);
    });

    middleware1.go(function() {
      assert.equal(this.first, true);
      middleware2.go(function() {
        assert.equal(this.second, true);
        done();
      })
    });

  });


});
