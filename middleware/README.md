Middleware is the programming pattern of providing hooks with a resume callback.  
Here's the basic usage of the file that you'll be creating:

```js
var Middleware = require('./');  // <- this is the file you make;

var middleware = new Middleware();

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook1 = true;
    next();
  }, 10);
});

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook2 = true;
    next();
  }, 10);
});

var start = new Date();
middleware.go(function() {
  console.log(this.hook1); // true
  console.log(this.hook2); // true
  console.log(new Date() - start); // around 20
});
```

More info: http://expressjs.com/guide/using-middleware.html
