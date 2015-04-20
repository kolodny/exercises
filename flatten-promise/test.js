var assert = require('assert');
var flattenPromise = require('./');

describe('flattenPromise', function() {

  it('flattens the promises', function(done) {
    var p1 = new Promise(function(resovle) { resovle('done'); });
    var p2 = new Promise(function(resovle) { resovle(p1); });
    var p3 = new Promise(function(resovle) { resovle(p2); });
    var p4 = new Promise(function(resovle) { resovle(p3); });

    flattenPromise(p4).then(function(result) {
      assert.equal(result, 'done');
      done();
    });
  });


});
