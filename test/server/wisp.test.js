'strict';

const Wisp = require('../../server/wisp');

test('Wisp can instantiate a wisp object with traits greater than 0.', () => {
  const result = new Wisp();
  expect(result.name).toBe('a wisp');
  expect(result.life).toBeGreaterThan(0);
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

