module.exports = Kicker;

/*
Some of the tests in this project rely on the event loop being instant while the
reality is quite different. This helper tries to fix that discrepancy. Usage is as follows:

var kicker = new Kicker(10) // kicks things to the next possible 10 ms

setTimeout(() => kicker.add(), 2)  // About +0
setTimeout(() => kicker.add(), 13) // About +10
setTimeout(() => kicker.add(), 25) // About +10
setTimeout(() => kicker.add(), 38) // About +10
setTimeout(() => kicker.add(), 41) // About +0

setTimeout(() => console.log(kicker.kick()), 50) // [0, 10, 20, 30, 30]

*/

function Kicker(snap) {
  if (!(this instanceof Kicker)) return new Kicker(snap);
  this.snap = snap
  this.times = []
  this.start = new Date()
}

Kicker.prototype.add = function add() {
  this.times.push(new Date() - this.start);
}

Kicker.prototype.kicked = function kick() {
  var kickedTimes = []
  var time = 0;
  var offset = 0;
  for (var i = 0; i < this.times.length; i++) {
    var time = this.times[i] - offset;
    var kicked = Math.floor(time / this.snap) * this.snap;
    offset += time - kicked;
    time = kicked;
    kickedTimes.push(time)
  }
  return kickedTimes
}
