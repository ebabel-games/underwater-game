const { deepCopy } = require('./utils.js');
const { createWisp } = require('./create-wisp.js');

module.exports = (name) => {
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
