'use strict';

const updatePlayerPosition = (socket) => {
  if (!socket) return;

  socket.on('updatePlayerPosition', (playerState) => {
    // Broadcast to all other players the position of the current player.
    socket.broadcast.emit('updateOtherPlayerPosition', playerState);

    // Update central store for a single player whose state has changed.
    global.dataStore.players[playerState.name].position = playerState.position;
  });
};

module.exports = updatePlayerPosition;
