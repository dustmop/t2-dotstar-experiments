const tessel = require('tessel')
const color = require('color')
const DotStarStrip = require('./dotstar')

let strip = new DotStarStrip(60, 'A')

strip.init(4000000)

let options = {
  color: [0, 200, 255]
}

let i = 0;
let r = g = b = 0;
let n = 0;
let choice = 0;

let max = 60;

strip.clear(function() {
  setInterval(function() {
    i++;
    if (i * 1 >= max) {
      i = 0;
      choice++;
      if (choice == 3) { choice = 0; }
    }
    let limit = (i * 1);
    for (let k = 0; k < limit; k++) {
      r = choice == 0 ? 0xff : 0x00;
      g = choice == 1 ? 0xff : 0x00;
      b = choice == 2 ? 0xff : 0x00;
      strip.poke({pixel: k, color: [r, g, b]})
    }
    strip.send()
  }, 20)
});
