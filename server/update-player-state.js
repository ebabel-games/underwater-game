'strict';

const updatePlayerState = (socket) => {
  socket.on('updatePlayerState', (playerState) => {
    // Broadcast to all other players the state of the current player.
    socket.broadcast.emit('updateOtherPlayerStates', playerState);

    // Update centra store for all states.
    // todo: update dataStore.
  });
};

module.exports = updatePlayerState;
