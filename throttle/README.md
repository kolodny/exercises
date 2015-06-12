Here's the basic usage of the file that you'll be creating:

```js
var throttle = require('./') // <- this is the file you make;

var sayHi = function() {
  console.log('hi');
};

var throttled = throttle(sayHi, 100);

throttled();
throttled();
throttled();
throttled();

// there should only be one 'hi' message on the console
```

More info: http://underscorejs.org/#throttle
