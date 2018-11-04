'strict';

const BlessedWisp = require('../../server/blessed-wisp');

test('BlessedWisp can be instantiated without any input for its constructor and set default values for its properties.', () => {
  const result = new BlessedWisp();
  expect(result.name).toBe('a blessed wisp');
  expect(result.strength).toBe(1);
  expect(result.stamina).toBe(18);
  expect(result.agility).toBe(18);
  expect(result.position.length).toBe(3);
  expect(isNaN(result.position[0])).toBe(false);
  expect(isNaN(result.position[1])).toBe(false);
  expect(isNaN(result.position[2])).toBe(false);
  expect(result.rotation.length).toBe(3);
  expect(isNaN(result.rotation[0])).toBe(false);
  expect(isNaN(result.rotation[1])).toBe(false);
  expect(isNaN(result.rotation[2])).toBe(false);
  expect(result.life).toBe(700);
  expect(result.attack).toBe(24);
  expect(result.defence).toBe(53);
  expect(result.fightMode).toBe(false);
  expect(result.color).toEqual([0.1583, 0.9, 0.67]);
  expect(result.respawnLife).toEqual(result.life);
});

