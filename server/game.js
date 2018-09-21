const gameloop = require('node-gameloop');

const { random } = require('./utils.js');
const { createNpc } = require('./npc.js');
const { npcMove } = require('./npc-move.js');
const { npcFight } = require('./npc-fight.js');

const minNpcPopulation = 66;
const defaultFps = 10;

// Main server-side game function.
// @io: socket.io
// @fps: number of frames per second.
module.exports = (input) => {
  const {
    io,
    dataStore,
    fps = defaultFps
  } = input;

  let frameCount = 0;
  let oneSecond = 0;

  // Main game loop that runs continuously.
  // Note: run gameloop.clearGameLoop(id); to stop the loop from running.
  const id = gameloop.setGameLoop((delta) => {  /* eslint no-unused-vars: 0 */
    // Move all npc sprites.
    dataStore.npc = npcMove(dataStore.npc);

    // Runs every 1 second.
    oneSecond += delta;
    const oneSecondFlag = oneSecond > 1;

    // Spawn very fast if the population of alive npc is lower
    // than minimum npc population, or spawn every second.
    if (oneSecondFlag || dataStore.npc.filter(n => n.state.life > 0).length < minNpcPopulation) {
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
    }

    // All npc that are close to each other will fight (bar exceptions, like blessed wisp).
    if (oneSecondFlag) {
      dataStore.npc = npcFight(dataStore.npc, io);
    }

    // Update life, and fightMode for all npc after their fights.
    const npcStates = dataStore.npc.map((n) => {
      return {
        position: n.state.position,
        life: n.state.life,
        fightMode: n.state.fightMode,
      };
    });
    io.emit('updateNpcStates', npcStates);

    // Reset.
    if (oneSecondFlag) oneSecond = 0;

    frameCount = frameCount + 1;
  }, 1000 / fps);
};
