const tessel = require('tessel')
const color = require('color')
const DotStarStrip = require('./dotstar')

let strip = new DotStarStrip(10, 'A')

strip.init(4000000)

let options = {
  color: [0, 200, 255]
}

let i = 0;
let r = g = b = 0;
let n = 0;

strip.clear(function() {
  setInterval(function() {
    i++;
    r = i % 3 == 0 ? 0xff : 0x00;
    g = i % 3 == 1 ? 0xff : 0x00;
    b = i % 3 == 2 ? 0xff : 0x00;
    strip.setPixel({pixel: 10, color: [r, g, b]})
  }, 200)
});
