Here's the basic usage of the file that you'll be creating:

```js
var flattenPromise = require('./') // <- this is the file you make;

var p1 = new Promise(function(resovle) { resovle('done'); });
var p2 = new Promise(function(resovle) { resovle(p1); });
var p3 = new Promise(function(resovle) { resovle(p2); });
var p4 = new Promise(function(resovle) { resovle(p3); });

flattenPromise(p4).then(function(result) {
  console.log(result); // 'done'
});
```

More info: http://www.html5rocks.com/en/tutorials/es6/promises/
