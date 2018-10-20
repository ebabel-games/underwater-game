'strict';

const { mockIo } = require('ebabel');

const spawnPlayer = require('../../server/spawn-player');

let io;

beforeEach(() => {
  io = mockIo;
});

test('spawnPlayer returns undefined', () => {
  const result = spawnPlayer(io, 1, {});
  expect(result).toBe(undefined);
});
