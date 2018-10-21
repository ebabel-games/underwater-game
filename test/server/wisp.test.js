'strict';

const Wisp = require('../../server/wisp');

test('Wisp can instantiate a wisp object with default values when no input is supplied to the constructor.', () => {
  const result = new Wisp();
  expect(result.name).toBe('a wisp');
  expect(result.strength).toBeGreaterThan(0);
  expect(result.stamina).toBeGreaterThan(0);
  expect(result.agility).toBeGreaterThan(0);
  expect(result.position.length).toBe(3);
  expect(isNaN(result.position[0])).toBe(false);
  expect(isNaN(result.position[1])).toBe(false);
  expect(isNaN(result.position[2])).toBe(false);
  expect(result.rotation.length).toBe(3);
  expect(isNaN(result.rotation[0])).toBe(false);
  expect(isNaN(result.rotation[1])).toBe(false);
  expect(isNaN(result.rotation[2])).toBe(false);
  expect(result.life).toBeGreaterThan(0);
  expect(result.attack).toBeGreaterThan(0);
  expect(result.defence).toBeGreaterThan(0);
  expect(result.fightMode).toBe(false);
  expect(result.color).toEqual([0.64, 0.9, 0.7]);
  expect(result.respawnedLife).toEqual(result.life);
});

test('Wisp defaults to 20 life when stamina and agility sum are exactly the same value as strength.', () => {
  const result = new Wisp({
    stamina: 10,
    agility: 10,
    strength: 20,
  });
  expect(result.life).toBe(20);
});

test('Wisp defaults to 1 in attack when strength is half of agility.', () => {
  const result = new Wisp({
    agility: 10,
    strength: 5,
  });
  expect(result.attack).toBe(1);
});

test('Wisp defaults to 1 in defence when agility is half of strength.', () => {
  const result = new Wisp({
    agility: 5,
    strength: 10,
  });
  expect(result.defence).toBe(1);
});

