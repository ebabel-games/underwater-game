'strict';

const updatePlayerState = (socket) => {
  socket.on('updatePlayerState', (playerState) => {
    // Broadcast to all other players the state of the current player.
    socket.broadcast.emit('updateOtherPlayerStates', playerState);

    // Update central store for a single player whose state has changed.
    global.dataStore.players[playerState.name] = playerState;
  });
};

module.exports = updatePlayerState;
