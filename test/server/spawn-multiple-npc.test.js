'strict';

const spawnMultipleNpc = require('../../server/spawn-multiple-npc');

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

test('spawnMultipleNpc returns undefined.', () => {
  const result = spawnMultipleNpc(io, 1, {});
  expect(result).toBe(undefined);
});

