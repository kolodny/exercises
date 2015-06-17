Here's the basic usage of the file that you'll be creating:

```js
var curry = require('./') // <- this is the file you make;

function add(a, b) {
  return a + b;
}

var curried = curry(add);
console.log(  curried(1)(2)  ); // 3
```

More info: https://en.wikipedia.org/wiki/Currying
