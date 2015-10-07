var assert = require('assert');
var merkle = require('./');

var crypto = require('crypto');

describe('merkle', function() {

  describe('has a root property correctly set when', function() {

    it('has a power of two elements', function() {
      var myMerkle = merkle(['This', 'is', 'a', 'test'], simpleHasher);
      var verificationObject = myMerkle.getVerification('test')
      assert.equal(myMerkle.root, -1427219841, 'hashes match')
    });

    it('has a power of two elements with dupes', function() {
      var myMerkle = merkle(['This', 'is', 'cool', 'cool'], simpleHasher);
      assert.equal(myMerkle.root, 678075951, 'hashes match')
    });

    it('has a an odd number of elements', function() {
      var myMerkle = merkle(['This', 'is', 'cool'], simpleHasher);
      assert.equal(myMerkle.root, 678075951, 'hashes match')
    });

    it('has a large number of elements', function() {
      var arr = 'here is a test to see if we can find all the cool words in this list'.split(' ');
      var myMerkle = merkle(arr, simpleHasher);
      assert.equal(myMerkle.root, -721821363)
    });

  });

  describe('can verify an element is in a tree when', function() {

    it('has a power of two elements', function() {
      var myMerkle = merkle(['This', 'is', 'a', 'test'], simpleHasher);
      var obj = myMerkle.getVerification('is')
      assert(merkle.verify('is', myMerkle.root, obj, simpleHasher))
    });

    it('has a power of two elements with dupes', function() {
      var myMerkle = merkle(['This', 'is', 'cool', 'cool'], simpleHasher);
      var obj = myMerkle.getVerification('cool')
      assert(merkle.verify('cool', myMerkle.root, obj, simpleHasher))
    });

    it('has a an odd number of elements', function() {
      var myMerkle = merkle(['This', 'is', 'cool'], simpleHasher);
      var obj = myMerkle.getVerification('cool')
      assert(merkle.verify('cool', myMerkle.root, obj, simpleHasher))
    });

    it('has a large number of elements', function() {
      var arr = 'here is a test to see if we can find all the cool words in this list'.split(' ');
      var myMerkle = merkle(arr, simpleHasher);
      var obj = myMerkle.getVerification('cool')
      assert(merkle.verify('cool', myMerkle.root, obj, simpleHasher))
    });

  });


  it('works just like bitcoin!', function() {
    var seeder = doublesha256('some seed');
    var values = [];
    for (var i = 0; i < 10000; i++) {
      values.push('value' + i + ' ' + doublesha256(seeder + i));
    }
    var myMerkle = merkle(values, doublesha256);
    var lookFor = values[4567];
    var obj = myMerkle.getVerification(lookFor);
    assert.equal(myMerkle.root, 'e213bb72c8975346d44abc5bfc917ef2e28ef8277007e9c3346f238c6a0d68d1')
    assert(merkle.verify(lookFor, myMerkle.root, obj, doublesha256))
  });

});






// HELPERS

// from http://stackoverflow.com/a/7616484
function simpleHasher(str) {
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

function doublesha256(str) {
  return sha256(sha256(str));
}

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}
