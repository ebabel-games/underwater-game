const { deepCopy } = require('./utils');
const { createWisp } = require('./create-wisp');
const { createBlessedWisp } = require('./create-blessed-wisp');
const { createEvilWisp } = require('./create-evil-wisp');

const npc = {
  // Create a new Non Playing Character.
  createNpc: (io, name = 'a wisp') => {
    // Creation characteristics. These will never change in the creation object.
    let creation;

    switch (name) {
      case 'an evil wisp':
        creation = createEvilWisp();
        break;
      case 'a blessed wisp':
        creation = createBlessedWisp();
        break;
      default:
        creation = createWisp();
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
