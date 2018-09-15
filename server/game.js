const gameloop = require('node-gameloop');

const { random, randomPosOrNeg } = require('./utils.js');
const { createNpc } = require('./npc.js');

const maxNpcPopulation = 200;

// Main server-side game function.
// @io: socket.io
// @rate: number of frames per second. Default is 30 fps.
module.exports = (input) => {
  const {
    io,
    dataStore,
    rate = 30
  } = input;

  let frameCount = 0;
  let oneSecond = 0;

  // Main game loop that runs continuously.
  // Note: run gameloop.clearGameLoop(id); to stop the loop from running.
  const id = gameloop.setGameLoop((delta) => {
    // Move all npc sprites.
    dataStore.npc = dataStore.npc.map((n) => {
      const direction = random(3);
      switch (direction) {
        case 1:
          n.state.position[0] += randomPosOrNeg(20);
          break;
        case 2:
          n.state.position[1] += randomPosOrNeg(20);
          break;
        default:
          n.state.position[2] += randomPosOrNeg(20);
      }
      return n;
    });

    // Update positions for all npc.
    const npcPositions = dataStore.npc.map((n) => n.state.position);
    io.emit('updateNpcPositions', npcPositions);

    // Runs every 1 second.
    oneSecond += delta;
    if (oneSecond > 1 && dataStore.npc.length < maxNpcPopulation) {
      // Random changes to spawn a certain npc.
      const spawnChance = random(99);
      switch (spawnChance) {
        case 33:
          dataStore.npc.push(createNpc(io, 'a blessed wisp'));
          break;
        case 6:
        case 66:
          dataStore.npc.push(createNpc(io, 'an evil wisp'));
          break;
        default:
          dataStore.npc.push(createNpc(io));
      }

      // Reset.
      oneSecond = 0;
    }

    frameCount = frameCount + 1;
  }, 1000 / rate);
};
