var assert = require('assert');
var invertTree = require('./');

describe('invert-tree', function() {
  it('inverts a binary tree', function() {

    var root = {value: 6};
    var left = {value: 4};
    var right = {value: 8};
    var leftOfLeft = {value: 3};
    var rightOfLeft = {value: 5};
    var leftOfRight = {value: 7};
    var rightOfRight = {value: 9};
    root.left = left;
    root.right = right;
    left.left = leftOfLeft;
    left.right = rightOfLeft;
    right.left = leftOfRight;
    right.right = rightOfRight;

    invertTree(root);

    assert.deepEqual(root, {
      "value": 6,
      "left": {
        "value": 8,
        "left": {
          "value": 9
        },
        "right": {
          "value": 7
        }
      },
      "right": {
        "value": 4,
        "left": {
          "value": 5
        },
        "right": {
          "value": 3
        }
      }
    });


  });
});
