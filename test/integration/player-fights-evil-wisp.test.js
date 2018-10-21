'strict';

const log4js = require('log4js');
const log4jsConfig = require('./log4js-config');
log4js.configure(log4jsConfig('player-fights-evil-wisp'));

const summaryLogger = log4js.getLogger('summary');
summaryLogger.level = 'all';

const fullLogger = log4js.getLogger('full');
fullLogger.level = 'all';

const Player = require('../../server/player');
const EvilWisp = require('../../server/evil-wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;

const logMessage = (message) => `Fight summary: ${message.playerName} ${message.playerEndLife <=0 ? 'dies' : 'wins'} after ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, ${message.mobName} started with ${message.mobStartLife} life and ended with ${message.mobEndLife}.`;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  fullLogger.info(`Player ${thomas.name} pops ${JSON.stringify(thomas)}.`);
  mob = new EvilWisp();
  fullLogger.info(`${mob.name} pops ${JSON.stringify(mob)}.`);
});

test('Fight 1 - Setup a player and a mob then fight until either of them dies.', () => {
  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 2 - Setup a player (with 500 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 500;

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 3 - Setup a player (with 400 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 400;

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 4 - Setup a player (with 300 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 300;

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Fight 5 - Setup a player (with 200 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 200;

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Round 6 - Setup a player (with 100 life) and a mob then fight until either of them dies.', () => {
  thomas.life = 100;

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    mobStartLife: mob.life,
    fightRounds: 0,
  };

  while(thomas.life > 0 && mob.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));
  }

  message.playerEndLife = thomas.life;
  message.mobEndLife = mob.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});
