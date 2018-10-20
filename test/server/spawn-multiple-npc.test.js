'strict';

const { mockIo } = require('ebabel');

const spawnMultipleNpc = require('../../server/spawn-multiple-npc');

let io;

beforeEach(() => {
  io = mockIo;
});

test('spawnMultipleNpc returns undefined.', () => {
  const result = spawnMultipleNpc(io, 1, {});
  expect(result).toBe(undefined);
});

