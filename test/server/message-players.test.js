'strict';

const {
  greetSinglePlayer,
  waveOtherPlayers,
  messageAllPlayers,
} = require('../../server/message-players');

let io;
let socket;

beforeEach(() => {
  // Mock io.
  io = {
    emit: () => {},
    to: () => {
      return {
        emit: () => {} 
      };
    },
  };

  // Mock socket.
  socket = {
    on: () => {},
    broadcast: {
      emit: () => {},
    },
  };
});

test('greetSinglePlayer calls io.to() with socket id parameter', () => {
  const result = greetSinglePlayer(io, 1, 'Thomas');
  expect(result).toBe(undefined);
});

test('greetSinglePlayer calls io.to.emit() with two string parameters', () => {
  const result = greetSinglePlayer(io, 1, 'Dave');
  expect(result).toBe(undefined);
});

test('waveOtherPlayers calls io.broadcast.emit with two string parameters', () => {
  const result = waveOtherPlayers(socket, 'Ernesto');
  expect(result).toBe(undefined);
});

test('messageAllPlayers registers a chatMessage event listener with socket', () => {
  const result = messageAllPlayers(socket, io);
  expect(result).toBe(undefined);
});

