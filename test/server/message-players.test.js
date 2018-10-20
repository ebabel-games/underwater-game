'strict';

const { mockSocket, mockIo } = require('ebabel');

const {
  greetSinglePlayer,
  waveOtherPlayers,
  messageAllPlayers,
} = require('../../server/message-players');

let socket;
let io;

beforeEach(() => {
  socket = mockSocket;
  io = mockIo;
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

