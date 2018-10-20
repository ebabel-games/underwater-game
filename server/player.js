'strict';

const Wisp = require('./wisp');

class Player extends Wisp {
  constructor(input) {
    super(input);

    // Extra life so that players last a bit longer than wisps.
    this.life = this.life + 200;

    this.position = [0, 0, 0];
    this.color[0] = 0.3583; // Hue.

    // Communication to a single player: socketId.
    this.socketId = input.socketId;
  }
}

module.exports = Player;
