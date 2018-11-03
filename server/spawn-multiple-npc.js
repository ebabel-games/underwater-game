'use strict';

// For a single player, spawn all NPCs.
const spawnMultipleNpc = (io, socketId, npc) => io.to(socketId).emit('spawnMultipleNpc', npc);

module.exports = spawnMultipleNpc;
