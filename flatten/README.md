Here's the basic usage of the file that you'll be creating:

```js
var flatten = require('./') // <- this is the file you make;

var arr = [1, [2], [3, 4, [5]]];

// Single level
flatten(arr); 
// => [1, 2, 3, 4, [5]]

// Recursively
flatten(arr, true); 
// => [1, 2, 3, 4, 5];

```

More info: https://lodash.com/docs#flatten
