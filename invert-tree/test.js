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

  it('inverts a deeper binary tree', function() {
    var root = {
      "value": 1,
      "left": {
        "value": 2,
        "left": {
          "value": 4,
          "left": { "value": 8 },
          "right": { "value": 9 }
        },
        "right": {
          "value": 5,
          "left": { "value": 10 },
          "right": { "value": 11 }
        }
      },
      "right": {
          "value": 3,
          "left": {
          "value": 6,
          "left": { "value": 12 },
          "right": { "value": 13 }
        },
        "right": {
          "value": 7,
          "left": { "value": 14 },
          "right": { "value": 15 }
        }
      }
    };

    invertTree(root);

    assert.deepEqual(root, {
      "value": 1,
      "left": {
        "value": 3,
        "left": {
          "value": 7,
          "left": { "value": 15 },
          "right": { "value": 14 }
        },
        "right": {
          "value": 6,
          "left": { "value": 13 },
          "right": { "value": 12 }
        }
      },
      "right": {
        "value": 2,
        "left": {
            "value": 5,
            "left": { "value": 11 },
            "right": { "value": 10 }
          },
          "right": {
            "value": 4,
          "left": { "value": 9 },
          "right": { "value": 8 }
        }
      }
    });
  });

  it('inverts an unbalanced tree', function() {
    var root = {
      "value": 1,
      "left": {
        "value": 2,
        "left": { "value": 4 },
        "right": { "value": 5 }
      },
      "right": {
        "value": 3
      }
    };

    invertTree(root);

    assert.deepEqual(root, {
      "value": 1,
      "left": {
        "value": 3,
        "left": { "value": 4 },
        "right": { "value": 5 }
      },
      "right": {
        "value": 2
      }
    });
  });
});