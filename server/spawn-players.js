'strict';

// Spawn current player.
const spawnPlayer = (io, socketId, player) => io.to(socketId).emit('spawnPlayer', player);

// Broadcast to all other players the state of the current player.
const updatePlayerState = (socket) => {
  socket.on('updatePlayerState', (playerState) => {
    socket.broadcast.emit('updateOtherPlayerStates', playerState);

    // todo: update dataStore.players ?
  });
};

module.exports = {
  spawnPlayer,
  updatePlayerState,
};
