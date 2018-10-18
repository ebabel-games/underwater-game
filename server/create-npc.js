'strict';

const Wisp = require('./wisp');
const BlessedWisp = require('./blessed-wisp');
const EvilWisp = require('./evil-wisp');

// Create a new Non Playing Character.
const createNpc = (io, name = 'a wisp') => {
  // Characteristics.
  let npc;

  switch (name) {
    case 'an evil wisp':
      npc = new EvilWisp();
      break;
    case 'a blessed wisp':
      npc = new BlessedWisp();
      break;
    default:
      npc = new Wisp();
  }

  io.emit('spawnSprite', npc);

  return npc;
};

module.exports = createNpc;
