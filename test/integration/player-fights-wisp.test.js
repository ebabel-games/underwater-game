'strict';

const Player = require('../../server/player');
const Wisp = require('../../server/wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;
let log;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  mob = new Wisp();
  log = [];
});

test('Setup a player and a mob then fight until either of them dies.', () => {
  log.push(`${thomas.name} life before fight: ${thomas.life} life.`);
  log.push(`${mob.name} life before fight: ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }

  log.push(...fightMessages);
  log.push(`${thomas.name} life after fight: ${thomas.life} life.`);
  log.push(`${mob.name} life after fight: ${mob.life} life.`);

  console.log(log); /* eslint no-console: 0 */

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});
