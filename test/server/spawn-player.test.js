'strict';

const spawnPlayer = require('../../server/spawn-player');

test('spawnPlayer returns undefined', () => {
  const result = spawnPlayer();
  expect(result).toBe(undefined);
});
