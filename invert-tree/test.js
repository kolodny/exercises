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

  it('inverts a right-leaning asymmetric tree', function() {
    var root = {value: 4};
    var right = {value: 6};
    var rightOfRight = {value: 8};
    root.right = right;
    right.right = rightOfRight;

    invertTree(root);

    root = JSON.parse(JSON.stringify(root));

    assert.deepEqual(root, {
      "value": 4,
      "left": {
        "value": 6,
        "left": {
          value: 8
        }
      }
    });
  });

  it('inverts a left-leaning asymmetric tree', function() {
    var root = {value: 5};
    var left = {value: 7};
    var leftOfLeft = {value: 9};
    root.left = left;
    left.left = leftOfLeft;

    invertTree(root);

    root = JSON.parse(JSON.stringify(root));

    assert.deepEqual(root, {
      "value": 5,
      "right": {
        "value": 7,
        "right": {
          value: 9
        }
      }
    });
  });
});
