const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const game = require('./game.js');

// Central store that keeps state of the whole game.
const dataStore = {
  npc: []
};

app.use(express.static('client'));

app.settings['x-powered-by'] = false;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

io.on('connection', (socket) => {
  // For a single player, spawn all NPCs.
  dataStore.npc.map((n) => io.to(socket.id).emit('spawnNpc', n));

  socket.on('playerStarts', (playerName) => {
    // Greet single player directly.
    io.to(socket.id).emit('chatMessage', `Welcome ${playerName}!`);

    // Tell all other players that a new player has logged in.
    socket.broadcast.emit('chatMessage', `${playerName} is online.`);
  });

  socket.on('chatMessage', (input) => io.emit('chatMessage', `${input.playerName} says "${input.chatMessage}"`));
});

let port = 3000;
if (process.env.NODE_ENV === 'production') port = 80;
http.listen(port, () => {
  console.log(`Underwater Game listening on port ${port}.`); /* eslint no-console: 0 */
});

// Start the server-side game.
game({ io, dataStore });
