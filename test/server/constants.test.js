'strict';

const c = require('../../server/constants');

test('Expected constants are set with the correct values.', () => {
  expect(c.agroDistance).toBe(1000);
  expect(c.minimumAttackScore).toBe(2);
  expect(c.lifeMultiplier).toBe(10);
  expect(c.minNpcPopulation).toBe(66);
  expect(c.maxNpcPopulation).toBe(99);
  expect(c.defaultFps).toBe(24);
  expect(c.respawnHeight).toBe(10000);
  expect(c.dataStore).toEqual({
    npc: [],
    players: {},
  });
});
