// Greet single player directly.
const greetSinglePlayer =  (io, socketId, name) => io.to(socketId).emit('chatMessage', `Welcome ${name}!`);

// Tell all other players that a new player has logged in.
const waveOtherPlayers = (socket, name) => socket.broadcast.emit('chatMessage', `${name} is online.`);

// Send all players any message from logged in player.
const messageAllPlayers = (socket, io) => socket.on('chatMessage', (input) => io.emit('chatMessage', `${input.name} says "${input.chatMessage}"`));

module.exports = {
  greetSinglePlayer,
  waveOtherPlayers,
  messageAllPlayers
};
