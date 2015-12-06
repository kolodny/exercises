var assert = require('assert');
var update = require('./');

describe('update', function() {

  describe('has a #$set method that', function() {
    var state;
    var commands;
    var nextState;
    beforeEach(function() {
      state = {
        a: {
          b: 22,
          c: 33
        },
        unChanged: {},
      };
      commands = { a: { c: {$set: 44} } };
      nextState = update(state, commands);
    });

    it('changes the tree on the directive', function() {
      assert(state.a.c !== nextState.a.c);
    })

    it('reuses state on different branches', function() {
      assert(state.unChanged === nextState.unChanged);
    });

    it('reuses state on same level', function() {
      assert(state.a.b === state.a.b);
    });


  });



  describe("can pass react's test suite", function() {


    it('should support push', function() {
      assert.deepEqual(update([1], {$push: [7]}), [1, 7]);
    });

    it('should support unshift', function() {
      assert.deepEqual(update([1], {$unshift: [7]}), [7, 1]);
    });

    it('should support splice', function() {
      assert.deepEqual(update([1, 4, 3], {$splice: [[1, 1, 2]]}), [1, 2, 3]);
    });

    it('should support merge', function() {
      assert.deepEqual(update({a: 'b'}, {$merge: {c: 'd'}}), {a: 'b', c: 'd'});
    });

    it('should support set', function() {
      assert.deepEqual(update({a: 'b'}, {$set: {c: 'd'}}), {c: 'd'});
    });

    it('should support apply', function() {
      assert.equal(update(2, {$apply: function(x) { return x * 2; }}), 4);
    });

    it('should support deep updates', function() {
      assert.deepEqual(update({a: 'b', c: {d: 'e'}}, {c: {d: {$set: 'f'}}}), {
        a: 'b',
        c: {d: 'f'},
      });
    });

    it('should perform safe hasOwnProperty check', function() {
      assert.deepEqual(update({}, {'hasOwnProperty': {$set: 'a'}}), {
        'hasOwnProperty': 'a',
      });
    });
  });


});
