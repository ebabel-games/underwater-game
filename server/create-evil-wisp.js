const { createWisp } = require('./create-wisp');

// Evil wisp, based on wisp.
const createEvilWisp = () => {
  const wisp = createWisp({
    name: 'an evil wisp',
    strength: 18,
    stamina: 1,
    agility: 1,
  });

  wisp.color[0] = 0;    // Hue.
  wisp.color[1] = 1;    // Saturation.
  wisp.color[2] = 0.5;  // Lightness.

  return wisp;
};

module.exports = {
  createEvilWisp,
};
