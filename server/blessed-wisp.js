const Wisp = require('./wisp');

class BlessedWisp extends Wisp {
  constructor(input) {
    super({
      ...input,
      name: 'a blessed wisp',
      strength: 1,
      stamina: 18,
      agility: 18,
    });

    this.color[0] = 0.1583; // Hue.
    this.color[2] = 0.67;   // Lightness.
  }
}

module.exports = BlessedWisp;
