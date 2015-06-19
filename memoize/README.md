Here's the basic usage of the file that you'll be creating:

```js
var memoize = require('./') // <- this is the file you make;

function expensiveOperation(val) {
  console.log('foo');
  return val;
}

var memoized = memoize(expensiveOperation);
console.log(memoized(1));
console.log(memoized(1));
console.log(memoized(2));
console.log(memoized(2, 'x'));

// the console should show:
// foo
// 1
// 1
// foo
// 2
// foo
// 2
```

More info: http://en.wikipedia.org/wiki/Memoization
