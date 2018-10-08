'strict';

const gameloop = require('node-gameloop');

const { random, randomPosition } = require('ebabel');
const createNpc = require('./create-npc');
const npcMove = require('./npc-move');
const npcVsNpc = require('./npc-vs-npc');
const playersVsNpc = require('./players-vs-npc');

const minNpcPopulation = 66;
const maxNpcPopulation = 99;
const defaultFps = 24;
const respawnHeight = 10000;

// Main server-side game function.
// @io: socket.io
// @fps: number of frames per second.
const game = (input) => {
  const {
    io,
    fps = defaultFps
  } = input;

  let frameCount = 0;
  let oneSecond = 0;

  // Main game loop that runs continuously.
  // Note: run gameloop.clearGameLoop(id); to stop the loop from running.
  const id = gameloop.setGameLoop((delta) => {  /* eslint no-unused-vars: 0 */
    // Move all npc sprites.
    global.dataStore.npc = npcMove(global.dataStore.npc);

    // Runs every 1 second.
    oneSecond += delta;
    const oneSecondFlag = oneSecond >= 1;

    // Spawn very fast if the npc population is lower than minimum,
    // or spawn every second as long as the population is less than the maximum.
    if ((oneSecondFlag && global.dataStore.npc.length < maxNpcPopulation) || global.dataStore.npc.length < minNpcPopulation) {
      // Random changes to spawn a certain npc.
      const spawnChance = random(99);
      switch (spawnChance) {
        case 33:
          global.dataStore.npc.push(createNpc(io, 'a blessed wisp'));
          break;
        case 6:
        case 66:
          global.dataStore.npc.push(createNpc(io, 'an evil wisp'));
          break;
        default:
          global.dataStore.npc.push(createNpc(io));
      }
    }

    // All npc that are close to each other will fight (bar exceptions, like blessed wisp).
    if (oneSecondFlag) {
      global.dataStore.npc = npcVsNpc(global.dataStore.npc);
    }

    // Current player fights nearby npc.
    if (oneSecondFlag && global.dataStore.players && Object.keys(global.dataStore.players).length > 0) {
      const { players, npc } = playersVsNpc(global.dataStore.players, global.dataStore.npc);
      global.dataStore.players = players;
      global.dataStore.npc = npc;
    }

    // Respawn dead npc that have reached a certain height after they drifted upwards.
    if (oneSecondFlag) {
      global.dataStore.npc = global.dataStore.npc.map((n) => {
        if (n.life <= 0 && n.position[1] >= respawnHeight) {
          n.life = n.respawnedLife;
          n.fightMode = false;
          n.position = randomPosition();
        }
  
        return n;
      });
    }

    // Update life, and fightMode for all npc after their fights.
    const npcStates = global.dataStore.npc.map((n) => {
      return {
        position: n.position,
        life: n.life,
        fightMode: n.fightMode,
      };
    });
    io.emit('updateNpcStates', npcStates);

    // Reset.
    if (oneSecondFlag) oneSecond = 0;

    frameCount = frameCount + 1;
  }, 1000 / fps);
};

module.exports = game;
