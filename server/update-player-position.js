'strict';

const updatePlayerPosition = (socket) => {
  socket.on('updatePlayerPosition', (playerState) => {
    // Broadcast to all other players the state of the current player.
    socket.broadcast.emit('updateOtherPlayerPosition', playerState);

    // Update central store for a single player whose state has changed.
    global.dataStore.players[playerState.name].position = playerState.position;
  });
};

module.exports = updatePlayerPosition;
