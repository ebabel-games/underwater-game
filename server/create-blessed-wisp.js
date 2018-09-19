const { createWisp } = require('./create-wisp.js');

// Blessed wisp, based on wisp.
const createBlessedWisp = () => {
  const wisp = createWisp({
    name: 'a blessed wisp',
    strength: 1,
    stamina: 18,
    agility: 18,
  });

  wisp.color = 0.1583;
  wisp.color[0] = 0.1583; // Hue.
  wisp.color[2] = 0.67;   // Lightness.

  return wisp;
};

module.exports = {
  createBlessedWisp
};
