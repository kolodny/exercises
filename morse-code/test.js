var assert = require('assert');
var sinon = require('sinon');
var transmitter = require('./');
var codes = require('./codes');

describe('transmitter', function() {

  var clock;

  before(function () { clock = sinon.useFakeTimers(); });
  after(function () { clock.restore(); });

  var toggledHistory;
  var toggle;
  var startTime;
  var timeouter;

  beforeEach(function() {
    toggledHistory = [];
    startTime = new Date();
    toggle = function() {
      toggledHistory.push(new Date() - startTime);
    };
    timeouter = function(fn, ms) {
      setTimeout(function() {
        fn();
      }, ms * 50);
    };
  });

  it('transmits a letter in morse code', function(done) {
    var options = {
      codes: codes,
      message: 's',
      toggle: toggle,
      timeouter: timeouter
    }
    transmitter(options, function() {
      assert.deepEqual(toggledHistory, [
        0, 50, 100, 150, 200, 250
      ]);
      done();
    });
    clock.tick(300);
  });


  it('transmits a word in morse code', function(done) {
    var options = {
      codes: codes,
      message: 'sos',
      toggle: toggle,
      timeouter: timeouter
    }
    transmitter(options, function() {
      assert.deepEqual(toggledHistory, [
        0, 50, 100, 150, 200, 250, 400, 550, 600, 750, 800,
        950, 1100, 1150, 1200, 1250, 1300, 1350
      ]);
      done();
    });
    clock.tick(1400);
  });

  it('transmits a message in morse code', function(done) {
    var options = {
      codes: codes,
      message: 'this is a message',
      toggle: toggle,
      timeouter: timeouter
    }
    transmitter(options, function() {
      assert.deepEqual(toggledHistory, [
        0, 150, 300, 350, 400, 450, 500, 550, 600, 650,
        800, 850, 900, 950, 1100, 1150, 1200, 1250, 1300,
        1350, 1700, 1750, 1800, 1850, 2000, 2050, 2100,
        2150, 2200, 2250, 2600, 2650, 2700, 2850, 3200,
        3350, 3400, 3550, 3700, 3750, 3900, 3950, 4000,
        4050, 4100, 4150, 4300, 4350, 4400, 4450, 4500,
        4550, 4700, 4750, 4800, 4950, 5100, 5250, 5300,
        5450, 5500, 5550, 5700, 5750
      ]);
      done();
    });
    clock.tick(5800);
  });


});
