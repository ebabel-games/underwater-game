'strict';

const log4js = require('log4js');
const log4jsConfig = require('./log4js-config');
log4js.configure(log4jsConfig('player-fights-two-wisps'));

const summaryLogger = log4js.getLogger('summary');
summaryLogger.level = 'all';

const fullLogger = log4js.getLogger('full');
fullLogger.level = 'all';

const Player = require('../../server/player');
const Wisp = require('../../server/wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;

const logMessage = (message) => `Fight summary: ${message.playerName} ${message.playerEndLife <=0 ? 'dies' : 'wins'} after ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, first ${message.mob1Name} started with ${message.mob1StartLife} life and ended with ${message.mob1EndLife}, second ${message.mob2Name} started with ${message.mob2StartLife} life and ended with ${message.mob2EndLife}.`;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  fullLogger.info(`Player ${thomas.name} pops ${JSON.stringify(thomas)}.`);
});

fullLogger.info("Test Case version 0.1 for player-fights-two-wisps.test.js - standard life only");

test('Player fights 2 wisps at the same time until either the player or both wisps are dead.', () => {
  const mob1 = new Wisp();
  const mob2 = new Wisp();

  fullLogger.info(`${mob1.name} pops ${JSON.stringify(mob1)}.`);
  fullLogger.info(`${mob2.name} pops ${JSON.stringify(mob2)}.`);

  const message = {
    playerName: thomas.name,
    playerStartLife: thomas.life,
    mob1Name: mob1.name,
    mob1StartLife: mob1.life,
    mob2Name: mob2.name,
    mob2StartLife: mob2.life,
    fightRounds: 0,
    mobsFought: 2,
  };

  while(thomas.life > 0) {
    const result1 = resolveFight(thomas, mob1);
    message.fightRounds += result1.fightMessages.length;
    result1.fightMessages.map((m) => fullLogger.info(m));

    // Only keep fighting if player is still alive.
    if (thomas.life > 0) {
      const result2 = resolveFight(thomas, mob2);
      message.fightRounds += result2.fightMessages.length;
      result2.fightMessages.map((m) => fullLogger.info(m));
    }

    // Stop fightings if both mob1 and mob2 are dead.
    if (mob1.life <= 0 && mob2.life <= 0) break;
  }

  message.playerEndLife = thomas.life;
  message.mob1EndLife = mob1.life;
  message.mob2EndLife = mob2.life;

  summaryLogger.info(logMessage(message));
  fullLogger.info(logMessage(message));

  expect(thomas.life <= 0 || (mob1.life <= 0 && mob2.life <= 0)).toBe(true);
});
