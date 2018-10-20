'strict';

const EvilWisp = require('../../server/evil-wisp');

test('EvilWisp can be instantiated without any input for its constructor and set default values for its properties.', () => {
  const result = new EvilWisp();
  expect(result.name).toBe('an evil wisp');
  expect(result.strength).toBe(18);
  expect(result.stamina).toBe(1);
  expect(result.agility).toBe(1);
  expect(result.position.length).toBe(3);
  expect(isNaN(result.position[0])).toBe(false);
  expect(isNaN(result.position[1])).toBe(false);
  expect(isNaN(result.position[2])).toBe(false);
  expect(result.rotation.length).toBe(3);
  expect(isNaN(result.rotation[0])).toBe(false);
  expect(isNaN(result.rotation[1])).toBe(false);
  expect(isNaN(result.rotation[2])).toBe(false);
  expect(result.life).toBe(320);
  expect(result.attack).toBe(53);
  expect(result.defence).toBe(24);
  expect(result.fightMode).toBe(false);
  expect(result.color).toEqual([0, 1, 0.5]);
  expect(result.respawnedLife).toEqual(result.life);
});

