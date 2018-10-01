const { trait, positive, randomPosition } = require('./utils');

// Wisp npc.
const createWisp = (input = {}) => {
  const {
    name = 'a wisp',
    strength = trait(),
    stamina = trait(),
    agility = trait(),
    position = randomPosition(),
    rotation = [0, 0, 0]
  } = input;

  const life = positive((stamina + agility - strength) * 20) || 20;

  return {
    name,
    strength,
    stamina,
    agility,
    life,
    attack: positive((strength * 3) - (agility * 1.5)) || 1,
    defence: positive((agility * 3) - (strength * 1.5)) || 1,
    position,
    rotation,
    fightMode: false,
    color: [0.64, 0.9, 0.7] // Hue, saturation, and lightness.
  };
};

module.exports = {
  createWisp,
};
