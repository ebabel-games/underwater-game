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



test('Round 2 - Setup a player (with 500 life) and a mob then fight until either of them dies.', () => {
  thomas.life=500;
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


test('Round 3 - Setup a player (with 400 life) and a mob then fight until either of them dies.', () => {
  thomas.life=400;
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


test('Round 4 - Setup a player (with 300 life) and a mob then fight until either of them dies.', () => {
  thomas.life=300;
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


test('Round 5 - Setup a player (with 200 life) and a mob then fight until either of them dies.', () => {
  thomas.life=200;
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



test('Round 6 - Setup a player (with 100 life) and a mob then fight until either of them dies.', () => {
  thomas.life=100;
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


