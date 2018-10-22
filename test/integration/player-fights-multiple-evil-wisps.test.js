'strict';

const log4js = require('log4js');
const log4jsConfig = require('./log4js-config');
log4js.configure(log4jsConfig('player-fights-multiple-evil-wisps'));

const summaryLogger = log4js.getLogger('summary');
summaryLogger.level = 'all';

const fullLogger = log4js.getLogger('full');
fullLogger.level = 'all';

const Player = require('../../server/player');
const EvilWisp = require('../../server/evil-wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;

const logMessage = (message) => `Fight summary: ${message.playerName} ${message.playerEndLife <=0 ? 'dies' : 'wins'} after ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, fought ${message.mobsFought} ${message.mobName}.`;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  fullLogger.info(`Player ${thomas.name} pops ${JSON.stringify(thomas)}.`);
  mob = new EvilWisp();
  fullLogger.info(`${mob.name} pops ${JSON.stringify(mob)}.`);
});

fullLogger.info("Test Case version 0.1 for player-fights-multiple-evil-wisps.test.js - standard life only ");

test('Player fights multiple evil wisps, one after the other, until the player dies.', () => {
  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mobName: mob.name,
    fightRounds: 0,
    mobsFought: 1,
  };

  while(thomas.life > 0) {
    const result = resolveFight(thomas, mob);
    message.fightRounds += result.fightMessages.length;
    result.fightMessages.map((m) => fullLogger.info(m));

    if (mob.life <= 0) {
      mob = new EvilWisp();
      message.mobsFought += 1;
      fullLogger.info(`${mob.name} pops ${JSON.stringify(mob)}.`);
    }
  }

  message.playerEndLife = thomas.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0).toBe(true);
});
