'use strict';

const gameloop = require('node-gameloop');

const { random } = require('ebabel');

const c = require('./constants');
const createNpc = require('./create-npc');
const playersVsNpc = require('./players-vs-npc');

// Main server-side game function.
// @io: socket.io
// @fps: number of frames per second.
const game = (input) => {
  const {
    io,
    fps = c.defaultFps
  } = input;

  let frameCount = 0;
  let oneSecond = 0;

  // Main game loop that runs continuously.
  // Note: run gameloop.clearGameLoop(id); to stop the loop from running.
  const id = gameloop.setGameLoop((delta) => {  /* eslint no-unused-vars: 0 */
    // Runs every 1 second.
    oneSecond += delta;
    const oneSecondFlag = oneSecond >= 1;

    // Spawn very fast if the npc population is lower than minimum,
    // or spawn every second as long as the population is less than the maximum.
    if ((oneSecondFlag && global.dataStore.npc.length < c.maxNpcPopulation) || global.dataStore.npc.length < c.minNpcPopulation) {
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

    // Current player fights nearby npc.
    if (oneSecondFlag && global.dataStore.players && Object.keys(global.dataStore.players).length > 0) {
      const { players, npc } = playersVsNpc(global.dataStore.players, global.dataStore.npc, io);
      global.dataStore.players = players;
      global.dataStore.npc = npc;
    }

    // Respawn dead npc when they reach their respawn counter.
    if (oneSecondFlag) {
      global.dataStore.npc = global.dataStore.npc.map((n) => {
        if (n.life <= 0 && n.respawnCounter >= n.respawnTimer) {
          n.life = n.respawnLife;
          n.fightMode = false;
          n.position = n.respawnPosition;
          n.respawnCounter = 0;
        }

        if (n.life <= 0) {
          n.respawnCounter += 1;
        }
  
        return n;
      });
    }

    // Update life, and fightMode for all npc after their fights.
    if (oneSecondFlag) {
      const npcStates = global.dataStore.npc.map((n) => {
        return {
          position: n.position,
          life: n.life,
          fightMode: n.fightMode,
        };
      });
      io.emit('updateNpcStates', npcStates);
    }

    // Reset.
    if (oneSecondFlag) oneSecond = 0;

    frameCount = frameCount + 1;
  }, 1000 / fps);

  return id;
};

module.exports = game;
