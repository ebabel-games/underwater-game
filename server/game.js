const gameloop = require('node-gameloop');

const { createNpc } = require('./npc.js');

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
    // Runs every 1 second.
    oneSecond += delta;
    if (oneSecond > 1) {
      dataStore.npc.push(createNpc(io));

      // Reset.
      oneSecond = 0;
    }

    frameCount = frameCount + 1;
  }, 1000 / rate);
};
