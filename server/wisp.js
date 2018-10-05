const { trait, positive, randomPosition } = require('ebabel');

class Wisp {
  constructor(input = {}) {
    this.name = input.name || 'a wisp';
    this.strength = input.strength || trait();
    this.stamina = input.stamina || trait();
    this.agility = input.agility || trait();
    this.position = input.position || randomPosition();
    this.rotation = input.rotation || [0, 0, 0];
    this.life = input.life
      || positive((this.stamina + this.agility - this.strength) * 20)
      || 20;
    this.attack = input.attack
      || positive((this.strength * 3) - (this.agility * 1.5))
      || 1;
    this.defence = input.defence
      || positive((this.agility * 3) - (this.strength * 1.5))
      || 1;
    this.fightMode = input.fightMode
      || false;
    this.color = input.color
      || [0.64, 0.9, 0.7]; // Hue, saturation, and lightness.
  }
}

module.exports = {
  Wisp,
};
