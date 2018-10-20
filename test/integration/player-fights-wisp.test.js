'strict';

const log4js = require('log4js');
log4js.configure({
  appenders: { player_fights_wisp: { type: 'file', filename: 'player_fights_wisp.log' } },
  categories: { default: { appenders: [ 'player_fights_wisp' ], level: 'all' } }
});

const logger = log4js.getLogger('player_fights_wisp');
logger.level = 'all';

const Player = require('../../server/player');
const Wisp = require('../../server/wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  mob = new Wisp();
});

test('Fight 1 - Setup a player and a mob then fight until either of them dies.', () => {
  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 2 - Setup a player (with 500 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 500;

  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 3 - Setup a player (with 400 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 400;

  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 4 - Setup a player (with 300 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 300;

  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 5 - Setup a player (with 200 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 200;

  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Round 6 - Setup a player (with 100 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 100;

  logger.info(`Fight start: ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  const fightMessages = [];
  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    fightMessages.push(...result.fightMessages);
  }
  fightMessages.map((message) => logger.info(message));

  logger.info(`Fight result: ${fightMessages.length} rounds, ${thomas.name} ${thomas.life} life, ${mob.name} ${mob.life} life.`);

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});


//test('analyze and summarise log file - average and standard deviation for battle rounds over all the tests', () => {
// tbc - but want to run:
// grep result player_fights_wisp.log|awk '{sum+=$7; sumsq+=$7*$7} END {print "AVG :" sum/NR " STD_DEV:" sqrt(sumsq/NR - (sum/NR)**2)}'
//});


