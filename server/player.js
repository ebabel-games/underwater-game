const { deepCopy } = require('./utils.js');
const { createWisp } = require('./create-wisp.js');

module.exports = (input) => {
  const {
    name,
    io,
    socket,
    npc
  } = input;

  // Greet single player directly.
  io.to(socket.id).emit('chatMessage', `Welcome ${name}!`);

  // Tell all other players that a new player has logged in.
  socket.broadcast.emit('chatMessage', `${name} is online.`);

  // For a single player, spawn all NPCs.
  io.to(socket.id).emit('spawnMultipleNpc', npc);
  
  // Send all players any message from any player.
  socket.on('chatMessage', (input) => io.emit('chatMessage', `${input.name} says "${input.chatMessage}"`));

  // Broadcast to all other players the state of the current player.
  socket.on('updatePlayerState', (playerState) => {
    socket.broadcast.emit('updateOtherPlayerStates', playerState);
  });

  const player = {
    creation: createWisp({
      name,
      position: [0, 0, 0]
    })
  };

  player.creation.color[0] = 0.3583; // Hue.

  player.state = deepCopy(player.creation);

  // Spawn current player with both creation and state.
  io.to(socket.id).emit('spawnPlayer', player);

  // Spawn current player for all other players.
  socket.broadcast.emit('spawnOtherPlayer', player);

  return player;
};
