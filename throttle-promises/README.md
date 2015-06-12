Assume we have an array of functions that start an operation that does something async:

```js
var nextValue = 0;
var asyncFactory = function() {
  var resolveWith = nextValue++;
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(resolveWith + '!');
    }, Math.random() * 100);
  });
};
```

Here's how we would use this without throttling:

```js
Promise.all([ asyncFactory(), asyncFactory(), asyncFactory(), asyncFactory() ]).then(function(results) {
  console.log(results); // ['0!', '1!', '2!', '3!'];
});
```

Let's say we need to throttle this to only have a certain amount of promises running at a time


Here's the basic usage of the file that you'll be creating:

```js
var throttlePromises = require('./') // <- this is the file you make;

var nextValue = 0;
var asyncFactory = function() {
  var resolveWith = nextValue++;
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(resolveWith + '!');
    }, Math.random() * 100);
  });
};

var arr = [];
for (var i = 0; i < 100; i++) {
  arr.push(asyncFactory); // push the factory but don't instantiated since that would start it now
}

// this is the solution function you'll write
throttlePromises(5, arr).then(function(results) {
  console.log('only 5 promises were ever executing in parallel');
});
