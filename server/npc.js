const { createWisp } = require('./create-wisp.js');
const { createBlessedWisp } = require('./create-blessed-wisp.js');
const { createEvilWisp } = require('./create-evil-wisp.js');

module.exports = {
  // Create a new Non Playing Character.
  createNpc: (io, name = 'a wisp') => {
    // Creation characteristics. These will never change in the creation object.
    let creation;

    switch (name) {
      case 'an evil wisp':
        creation = createEvilWisp(name);
        break;
      case 'a blessed wisp':
        creation = createBlessedWisp(name);
        break;
      default:
        creation = createWisp(name);
    }

    // State will change based on how the npc evolves.
    // Deep copy from creation, so that state stays separate.
    const state = JSON.parse(JSON.stringify(creation));

    io.emit('spawnNpc', { creation, state });
    io.emit('chatMessage', `${creation.name} spawned with ${creation.life} life at ${creation.position}.`);

    return {
      creation,
      state
    };
  }
};
