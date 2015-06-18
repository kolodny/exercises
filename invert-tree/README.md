Here's the basic usage of the file that you'll be creating:

```js
var invertTree = require('./'); // <- this is the file you make

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

console.log(root.left.left.value); // should be 9
```

More info: https://en.wikipedia.org/?title=Binary_tree  
Also https://twitter.com/mxcl/status/608682016205344768 :wink: 
