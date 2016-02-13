Let's create a morse code transmitter

Create a function that gets injected: a lightbulb toggler function, a timeout mechanism function, a string message, and a map of chars to dot-dashes and make magic happen, additionally it should run a callback when done

The timeout mechanism is like setTimeout, the difference is that it takes a measurement of dots instead of ms so instead of `setTimeout(toggle, 150)` for dot you would do `options.timeouter(toggle, 1)` and for a dash you would do `options.timeouter(toggle, 3)`

A couple of things to know:

1. dot duration is the baseline timing measurement
2. dashes are timed as 3 dots
3. time between each dot or dash in the same letter is 1 dot
3. time between letters are 3 dots
4. time between words are 7 dots

Here's a pretty timeline graph of the string "so so":

```
Char:                's'       'o'     <space> 's'        'o'
Padding:            vvvvv   vvvvvvvvvvv       vvvvv   vvvvvvvvvvv
Lightbulb state:    101010001110111011100000001010100011101110111
```

Here's the the basic idea of how the file you make will get used

```js
var transmitter = require('./') // <- this is the file you make;

var codes = {s: '...', o: '---'};
var message = 'sos';
var timeouter = function(fn, ms) { setTimeout(fn, ms * 50); };
var toggle = function() {
  lightbulb.toggle();
}

transmitter({
  codes: codes,
  message: message,
  timeouter: timeouter,
  toggle: toggle
}, function(err) {
  console.log('message sent!');
});


```

More info: https://en.wikipedia.org/wiki/Morse_code
