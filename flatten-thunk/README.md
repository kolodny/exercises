Here's the basic usage of the file that you'll be creating:

```js
var flattenThunk = require('./') // <- this is the file you make;

var thunk1 = function(cb) {
  setTimeout(function() {
    cb(null, 'done');
  }, 1);
}
var thunk2 = function(cb) {
  setTimeout(function() {
    cb(null, thunk1);
  }, 1);
}
var thunk3 = function(cb) {
  setTimeout(function() {
    cb(null, thunk2);
  }, 1);
}

flattenThunk(thunk3)(function(err, result) {
  console.log(result); // 'done'
});
```

A thunk is basically a function that you call with just the callback as a parameter:

```js

// this is a regular node CPS function
fs.readFile('package.json', function(err, result) {
  console.log(result);
});

// this is a thunk
var readFileThunk = fs.readFileThunkily('package.json');
readFileThunk(function(err, result) {
  console.log(result);
});
```

More info: https://github.com/tj/node-thunkify
