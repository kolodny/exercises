Here's the basic usage of the file that you'll be creating:

```js
var sort = require('./') // <- this is the file you make;

var arr = [5, 1, 4, 2, 3];

var sorted = sort(arr);
console.log(sorted); // [1, 2, 3, 4, 5]
```

Obviously using the native sort function is cheating, so don't use it

More info: http://en.wikipedia.org/wiki/Sorting_algorithm
