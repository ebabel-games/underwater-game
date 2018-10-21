'strict';

const log4js = require('log4js');

log4js.configure({
  appenders: {
    summary: {
      type: 'file',
      filename: 'player-fights-wisp.log',
    },
    full: {
      type: 'file',
      filename: 'player-fights-wisp-full.log',
    },
  },
  categories: {
    default: {
      level: 'all',
      appenders: [ 'summary' ],
    },
    full: {
      level: 'all',
      appenders: [ 'full' ],
    },
  },
});

const summaryLogger = log4js.getLogger('summary');
summaryLogger.level = 'all';

const fullLogger = log4js.getLogger('full');
fullLogger.level = 'all';

const Player = require('../../server/player');
const Wisp = require('../../server/wisp');
const resolveFight = require('../../server/resolve-fight');

let thomas;
let mob;

const logMessage1 = (message) => `Fight summary: ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, ${message.mobName} started with ${message.mobStartLife} life and ended with ${message.mobEndLife}.`;
const logMessage2 = (message) => `Fight summary: ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, fought ${message.mobsFought} ${message.mobName}.`;
const logMessage3 = (message) => `Fight summary: ${message.fightRounds} rounds, ${message.playerName} started with ${message.playerStartLife} life and ended with ${message.playerEndLife} life, first ${message.mob1Name} started with ${message.mob1StartLife} life and ended with ${message.mob1EndLife}, second ${message.mob2Name} started with ${message.mob2StartLife} life and ended with ${message.mob2EndLife}.`;

beforeEach(() => {
  thomas = new Player({ socketId: 1, name: 'Thomas' });
  mob = new Wisp();
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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

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

  summaryLogger.info(logMessage1(message));
  fullLogger.info(logMessage1(message));

  expect(thomas.life <= 0 || mob.life <= 0).toBe(true);
});

test('Player fights multiple wisps, one after the other, until the player dies.', () => {
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
      mob = new Wisp();
      message.mobsFought += 1;
    }
  }

  message.playerEndLife = thomas.life;

  summaryLogger.info(logMessage2(message));
  fullLogger.info(logMessage2(message));

  expect(thomas.life <= 0).toBe(true);
});

test('Player fights 2 wisps at the same time until either the player or both wisps are dead.', () => {
  const mob1 = new Wisp();
  const mob2 = new Wisp();

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

  summaryLogger.info(logMessage3(message));
  fullLogger.info(logMessage3(message));

  expect(thomas.life <= 0 || (mob1.life <= 0 && mob2.life <= 0)).toBe(true);
});
