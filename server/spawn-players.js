// Spawn current player with both creation and state.
const spawnPlayer = (io, socketId, player) => io.to(socketId).emit('spawnPlayer', player);

// Broadcast to all other players the state of the current player.
const updatePlayerState = (socket) => {
  socket.on('updatePlayerState', (playerState) => {
    socket.broadcast.emit('updateOtherPlayerStates', playerState);
  });
};

module.exports = {
  spawnPlayer,
  updatePlayerState,
};
