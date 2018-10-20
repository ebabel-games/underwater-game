'strict';

const spawnMultipleNpc = require('../../server/spawn-multiple-npc');

test('spawnMultipleNpc returns undefined.', () => {
  const result = spawnMultipleNpc();
  expect(result).toBe(undefined);
});

