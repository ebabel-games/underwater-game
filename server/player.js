const { Wisp } = require('./wisp');
const { deepCopy } = require('./utils');

class Player extends Wisp {
  constructor(input) {
    super(input);

    this.position = [0, 0, 0];
    this.color[0] = 0.3583; // Hue.

    this.creation = deepCopy(this);

    this.state = deepCopy(this.creation);
  }
}

module.exports = {
  Player,
};
