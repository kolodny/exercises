Jasmine 1.3 doesn't really support async testing, instead it exposes two functions `runs` and `waitsFor`. You need to write it along these lines:

```js
it("does something async", function() {
  var flag = false;

  runs(function() {  
    setTimeout(function() {
      flag = true;
    }, 500);
  });

  waitsFor(function() {
    return flag;
  }, 750);

  runs(function() {
    console.log('asserting...');
    assert(flag === true);
  });
});
```

Assuming `it`, `runs`, and `waitFor` are available in scope, your job is to write a function thats usage is like this:

```js
var itWill = require('./') // <- this is the file you make;

itWill(function() {
  var flag = false;
  return {
    desc: "does something async",
    setup: function(done) {
      setTimeout(function() {
        flag = true;
        done();
      }, 500);
    },
    test: function() {
      console.log('asserting...');
      assert(flag === true);
    }
  };
});
```

More info: http://jasmine.github.io/1.3/introduction.html#section-Asynchronous_Support
