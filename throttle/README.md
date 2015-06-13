Here's the basic usage of the file that you'll be creating:

```js
var throttle = require('./') // <- this is the file you make;

var log = function(msg) {
  console.log(msg);
};

var throttled = throttle(log, 100);

throttled("First");
throttled("Second");
throttled("Third");
throttled("Fourth");

// Output should be:
// First
// Fourth
```

More info: http://underscorejs.org/#throttle
