You might know about [map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, let's implement your own `map` one.

`map` should function like `map` does:

```js
var map = require('./') // <- this is the file you make;

var numbers = [1, 2, 3];

var doubles = map(numbers, function(number) {
  return number * 2;
});

console.log(doubles); // [2, 4, 6]

```

More info: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
