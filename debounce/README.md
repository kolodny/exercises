Here's the basic usage of the file that you'll be creating:

```js
var debounce = require('./') // <- this is the file you make;

var sayHi = function() {
  console.log('hi');
};

var debounced = debounce(sayHi, 100);

debounced();
debounced();
debounced();
debounced();

// there should only be one 'hi' message on the console
```

More info: http://underscorejs.org/#debounce


### Difference between debounce and throttle
There's a lot in common between debounce and throttle, [people sometimes confuse the two](https://github.com/kolodny/exercises/issues/3#issuecomment-111623806). The general difference between them is that throttle is used to make sure the function doesn't execute more than once per x milliseconds as opposed to debounce which makes sure that the function doesn't execute until x milliseconds passed without it being called.

For example: Let's say that you have a page that darkens the background based on how far down the page the user scrolled and also saves the scroll location on the server. In the case of smooth scrolling this function can end up being called hundreds of times per second. Assuming that checking the page scroll involves some fancy math and DOM touching this can end up causing the function to still be running as the next scroll event happens :( .

Let's assume the user is continuously scrolling the page...

In the case of darkening the background you would use a throttle function because you want to still darken the background even as new scroll events happen, just not as often as they come in.

In the case of saving the scroll position on the server, you wouldn't want it to be saved until after the user is done scrolling, so you would use the debounce function.
