Here's the basic usage of the file that you'll be creating:

```js
var memoize = require('./') // <- this is the file you make;

function expensiveOperation() {
  console.log('this should be shown once');
  return 22;
}

var memoized = memoize(expensiveOperation);
console.log(memoized());
console.log(memoized());

// the console should show:
// this should be shown once
// 22
// 22

```

More info: http://en.wikipedia.org/wiki/Memoization
