const { deepCopy } = require('./utils.js');

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
  socket.on('chatMessage', (input) => io.emit('chatMessage', `${input.playerName} says "${input.chatMessage}"`));

  const player = {
    creation: {
      name,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    }
  };

  player.state = deepCopy(player.creation);

  return player;
};
