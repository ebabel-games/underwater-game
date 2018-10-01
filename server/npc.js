const { deepCopy } = require('./utils');
const { Wisp } = require('./wisp');
const { BlessedWisp } = require('./blessed-wisp');
const { EvilWisp } = require('./evil-wisp');

const npc = {
  // Create a new Non Playing Character.
  createNpc: (io, name = 'a wisp') => {
    // Creation characteristics. These will never change in the creation object.
    let creation;

    switch (name) {
      case 'an evil wisp':
        creation = new EvilWisp();
        break;
      case 'a blessed wisp':
        creation = new BlessedWisp();
        break;
      default:
        creation = new Wisp();
    }

    // State will change based on how the npc evolves.
    // Deep copy from creation, so that state stays separate.
    const state = deepCopy(creation);

    io.emit('spawnSprite', { creation, state });

    return {
      creation,
      state,
    };
  }
};

module.exports = {
  npc,
};
