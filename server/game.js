const gameloop = require('node-gameloop');

// Main server-side game function.
// @io: socket.io
// @rate: number of frames per second. Default is 30 fps.
module.exports = (io, rate = 30) => {
  let frameCount = 0;
  let oneSecond = 0;

  const id = gameloop.setGameLoop((delta) => {

    // Runs every 1 second.
    oneSecond += delta;
    if (oneSecond > 1) {
      io.emit('chatMessage', `Frame ${frameCount}. Delta ${delta}.`);

      // Reset.
      oneSecond = 0;
    }
    
    frameCount = frameCount + 1;
  }, 1000 / rate);
};
