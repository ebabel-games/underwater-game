'strict';

// Greet single player directly.
const greetSinglePlayer =  (io, socketId, name) => EG.io.to(socketId).emit('chatMessage', `Welcome ${name}!`);

// Tell all other players that a new player has logged in.
const waveOtherPlayers = (socket, name) => EG.socket.broadcast.emit('chatMessage', `${name} is online.`);

// Send all players any message from logged in player.
const messageAllPlayers = (socket, io) => EG.socket.on('chatMessage', (input) => EG.io.emit('chatMessage', `${input.name} says "${input.chatMessage}"`));

module.exports = {
  greetSinglePlayer,
  waveOtherPlayers,
  messageAllPlayers,
};
