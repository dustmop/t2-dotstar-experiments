const tessel = require('tessel')
const color = require('color')
const DotStarStrip = require('./dotstar')

const numPixels = 60;

let strip = new DotStarStrip(numPixels, 'A')

let flexValue = 0;

var sensor = tessel.port.B.pin[2];

function scaleFlexSensor(rawValue) {
  const rawMax = 3.3;
  const rawMin = 1.764404296875;
  const rawHeight = rawMax - rawMin;
  const scaleRange = numPixels;
  const scaleEffect = scaleRange / rawHeight;
  return scaleRange - (rawValue - rawMin) * scaleEffect + 1;
}

setInterval(function() {
  sensor.analogRead(function(err, rawValue) {
    if (err) {
      return;
    }
    flexValue = scaleFlexSensor(rawValue);
  });
}, 100);

strip.init(4000000)

let options = {
  color: [0, 200, 255]
}

let cycle = 0;
let r = g = b = 0;
let n = 0;
let choice = 0;

console.log('starting...')

setTimeout(function() {
strip.clear(function() {
  setInterval(function() {
    cycle++;
    if (cycle >= 2) {
      cycle = 0;
      choice++;
      if (choice == 3) { choice = 0; }
    }
    let limit = flexValue;
    for (let k = 0; k < numPixels; k++) {
      if (k < limit) {
        r = choice == 0 ? 0xff : 0x00;
        g = choice == 1 ? 0xff : 0x00;
        b = choice == 2 ? 0xff : 0x00;
        strip.poke({pixel: k, color: [r, g, b]});
      } else {
        strip.poke({pixel: k, color: [0, 0, 0]})
      }
    }
    strip.send();
  }, 200);
});
}, 50);
