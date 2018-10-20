'strict';

const Player = require('../../server/player');
const Wisp = require('../../server/wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  mob = new Wisp();
});

test('Setup a player and a mob then run a single exchange of fighting.', () => {
  const result = resolveFight(thomas, mob);

  console.log(thomas); /* eslint no-console: 0 */

  expect(thomas).not.toBe(undefined);
  expect(mob).not.toBe(undefined);
  expect(result).not.toBe(undefined);
});
