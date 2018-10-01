const { deepCopy } = require('./utils');
const { createWisp } = require('./create-wisp');

const player = (name) => {
  const player = {
    creation: createWisp({
      name,
      position: [0, 0, 0]
    })
  };

  player.creation.color[0] = 0.3583; // Hue.

  player.state = deepCopy(player.creation);

  return player;
};

module.exports = {
  player,
};
