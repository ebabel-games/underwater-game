const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const game = require('./game.js');
const player = require('./player.js');
const { greetSinglePlayer, waveOtherPlayers, messageAllPlayers } = require('./message-players.js');
const { spawnMultipleNpc } = require('./spawn-multiple-npc.js');
const { spawnPlayer, updatePlayerState  } = require('./spawn-players.js');

// Central store that keeps state of the whole game.
const dataStore = {
  npc: [],
  players: {}
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
  let _name;

  // Add current player.
  socket.on('playerStarts', (name) => {
    _name = name;

    // Check if that name isn't used by a player.
    if (dataStore.players[name] !== undefined) {
      io.to(socket.id).emit('nameNotAvailable', name);
      return;
    }

    // Create the new player.
    dataStore.players[name] = player(name);

    // Messages
    greetSinglePlayer(io, socket.id, name);
    waveOtherPlayers(socket, name);
    messageAllPlayers(socket, io);

    // NPC.
    spawnMultipleNpc(io, socket.id, dataStore.npc);

    // Players.
    spawnPlayer(io, socket.id, dataStore.players[name]);
    updatePlayerState(socket);

    // Confirm the player has been created.
    io.to(socket.id).emit('playerCreated', name);

    // For the current player, spawn all previously existing players in game.
    io.to(socket.it).emit('spawnAllPreviousPlayers', dataStore.players);
  });

  socket.on('disconnect', () => {
    if (!_name) return;
    // Message all other players that current player has left the game.
    socket.broadcast.emit('chatMessage', `${_name} has left.`);

    // Delete player.
    delete dataStore.players[_name];

    // Remove player from all other clients when he stops playing.
    socket.broadcast.emit('removePlayer', _name);
  });
});

let port = 3000;
if (process.env.NODE_ENV === 'production') port = 80;
http.listen(port, () => {
  console.log(`Underwater Game listening on port ${port}.`); /* eslint no-console: 0 */
});

// Start the server-side game.
game({ io, dataStore });
