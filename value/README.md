Here's the basic usage of the file that you'll be creating:

```js
var value = require('./') // <- this is the file you make;

var scalar = 1;
var fn = function() { return 2; };
var fnTwice = function() {
  return fn;
};
var fnThrice = function() {
  return fnTwice;
};

var whoa = function() {
  return function() {
    return function() {
      return function() {
        return function() {
          return function() {
            return function() {
              return function() {
                return function() {
                  return 'hi';
                }
              }
            }
          }
        }
      }
    }
  }
};

value(scalar);   // should be      2;
value(fn);       // should also be 2;
value(fnTwice);  // should aslo be 2;
value(fnThrice); // should also be 2;

value(whoa); // should be 'hi'

```
