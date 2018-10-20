'strict';

const spawnPlayer = require('../../server/spawn-player');

let io;

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
});

test('spawnPlayer returns undefined', () => {
  const result = spawnPlayer(io, 1, {});
  expect(result).toBe(undefined);
});
