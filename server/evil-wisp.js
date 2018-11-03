'use strict';

const Wisp = require('./wisp');

class EvilWisp extends Wisp {
  constructor(input) {
    super({
      ...input,
      name: 'an evil wisp',
      strength: 18,
      stamina: 1,
      agility: 1,
    });

    this.color[0] = 0;    // Hue.
    this.color[1] = 1;    // Saturation.
    this.color[2] = 0.5;  // Lightness.
  }
}

module.exports = EvilWisp;
