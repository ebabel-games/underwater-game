const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('client'));

app.settings['x-powered-by'] = false;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

io.on('connection', (socket) => {
  io.emit('chatMessage', 'Player is online.');

  socket.on('disconnect', () => io.emit('chatMessage', 'Player is offline.'));
  socket.on('chatMessage', (chatMessage) => io.emit('chatMessage', `Player says "${chatMessage}"`));
});

let port = 3000;
if (process.env.NODE_ENV === 'production') port = 80;
http.listen(port, () => {
  console.log(`Underwater Game listening on port ${port}.`); /* eslint no-console: 0 */
});
