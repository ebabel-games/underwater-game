const Wisp = require('./wisp');

class Player extends Wisp {
  constructor(input) {
    super(input);

    this.position = [0, 0, 0];
    this.color[0] = 0.3583; // Hue.
  }
}

module.exports = Player;
