const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  io.emit('chatMessage', 'Player is online.');

  socket.on('disconnect', () => {
    io.emit('chatMessage', 'Player is offline.');
  });

  socket.on('chatMessage', (chatMessage) => {
    io.emit('chatMessage', `Player says "${chatMessage}"`);
  });
});

http.listen(3000, () => {
  console.log('Underwater Game listening on port 3000.');
});
