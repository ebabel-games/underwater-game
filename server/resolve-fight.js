'strict';

const { dice, random } = require('ebabel');

const c = require('./constants');

const fightRound = (attacker, defender) => {
  const roundMessages = [];

  if (attacker.life <= 0 || defender.life <= 0) return { attacker, defender };

  let attackScore = attacker.attack - defender.defence;

  if (attackScore < c.minimumAttackScore) attackScore = c.minimumAttackScore;

  if (dice() <= attackScore) {
    const damage = dice() * c.lifeMultiplier;
    defender.life -= damage;
    roundMessages.push(`${attacker.name} hits ${defender.name} for ${damage} life.`);
  } else {
    roundMessages.push(`${attacker.name} tries to hit ${defender.name} but misses.`);
  };

  // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
  if (defender.name === 'a blessed wisp' && defender.life > 0) {
    const heal = random(3) * c.lifeMultiplier;
    attacker.life += heal;
    roundMessages.push(`${attacker.name} is healed for ${heal} life by ${defender.name}.`);
  };

  return { attacker, defender, roundMessages };
};

/**
 * `resolveFight`
 * Execute 2 rounds of fight where fighterOne tries to hit fighterTwo,
 * and then fighterTwo tries to hit fighterOne.
 * @param {Object} fighterOne - Player or npc.
 * @param {Object} fighterTwo - Player or npc.
 * @returns {Object} fighterOne and fighterTwo life after the fight (2 rounds) has been executed.
 */
const resolveFight = (fighterOne, fighterTwo) => {
  const fightMessages = [];

  // Round 1: fighterOne tries to hit fighterTwo.
  if (fighterOne.name !== 'a blessed wisp') {
    let { attacker, defender, roundMessages } = fightRound(fighterOne, fighterTwo);
    fighterOne = attacker;
    fighterTwo = defender;
    Array.prototype.push.apply(fightMessages, roundMessages);
  }

  // Round 2: fighterTwo tries to hit fighterOne.
  if (fighterTwo.name !== 'a blessed wisp') {
    let { attacker, defender, roundMessages } = fightRound(fighterTwo, fighterOne);
    fighterOne = defender;
    fighterTwo = attacker;
    Array.prototype.push.apply(fightMessages, roundMessages);
  }

  return {
    fighterOneLife: fighterOne.life,
    fighterTwoLife: fighterTwo.life,
    fightMessages,
  };
};

module.exports = resolveFight;
