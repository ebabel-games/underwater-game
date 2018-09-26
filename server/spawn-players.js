// Spawn current player with both creation and state.
const spawnPlayer = (io, socketId, player) => io.to(socketId).emit('spawnPlayer', player);

// Spawn current player for all other players.
const spawnOtherPlayer = (socket, player) => socket.broadcast.emit('spawnOtherPlayer', player);

// Broadcast to all other players the state of the current player.
const updatePlayerState = (socket) => {
  socket.on('updatePlayerState', (playerState) => {
    socket.broadcast.emit('updateOtherPlayerStates', playerState);
  });
};

module.exports = {
  spawnPlayer,
  spawnOtherPlayer,
  updatePlayerState
};
