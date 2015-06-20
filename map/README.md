You might know about [map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, let's implement your own `map` one and name it, say `_map`.

`_map` should function like `map` does:

```js
require('./')() // <- this is the file you make;

var numbers = [1, 2, 3];

var doubles = numbers._map(function(number) {
  return number * 2;
});

console.log(doubles); // [1, 4, 6]

```

More info: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
