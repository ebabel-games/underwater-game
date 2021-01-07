'strict';

const updatePlayerPosition = (socket) => {
  if (!socket) return;

  EG.socket.on('updatePlayerPosition', (playerState) => {
    // Broadcast to all other players the position of the current player.
    EG.socket.broadcast.emit('updateOtherPlayerPosition', playerState);

    // Update central store for a single player whose state has changed.
    global.dataStore.players[playerState.name].position = playerState.position;
  });
};

module.exports = updatePlayerPosition;
