'use strict';

// Spawn current player.
const spawnPlayer = (io, socketId, player) => io.to(socketId).emit('spawnPlayer', player);

module.exports = spawnPlayer;
