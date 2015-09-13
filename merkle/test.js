var assert = require('assert');
var merkle = require('./');

var crypto = require('crypto');

describe('merkle', function() {

  it('works with power a two elements', function() {
    var merkleRoot = merkle(['This', 'is', 'a', 'test'], simpleHasher);
    assert.equal(merkleRoot, -1427219841, 'hashes match')
  });

  it('works with power a two elements with dupes', function() {
    var merkleRoot = merkle(['This', 'is', 'cool', 'cool'], simpleHasher);
    assert.equal(merkleRoot, 678075951, 'hashes match')
  });

  it('works with an odd number of elements', function() {
    var merkleRoot = merkle(['This', 'is', 'cool'], simpleHasher);
    assert.equal(merkleRoot, 678075951, 'hashes match')
  });

  it('works just like bitcoin!', function() {
    var seeder = doublesha256('some seed');
    var values = [];
    for (var i = 0; i < 10000; i++) {
      values.push('value' + i + ' ' + doublesha256(seeder + i));
    }
    var merkleRoot = merkle(values, doublesha256);
    assert.equal(merkleRoot, 'e213bb72c8975346d44abc5bfc917ef2e28ef8277007e9c3346f238c6a0d68d1')
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
