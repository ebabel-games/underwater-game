'strict';

// Spawn current player.
const spawnPlayer = (io, socketId, player) => EG.io.to(socketId).emit('spawnPlayer', player);

module.exports = spawnPlayer;
