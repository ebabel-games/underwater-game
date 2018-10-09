'strict';

const { dice, random } = require('ebabel');

const c = require('./constants');

const fightRound = (attacker, defender) => {
  if (attacker.life <= 0 || defender.life <= 0) return { attacker, defender };

  let attackScore = attacker.attack - defender.defence;

  if (attackScore < c.minimumAttackScore) attackScore = c.minimumAttackScore;

  if (dice() <= attackScore) defender.life -= dice() * c.lifeMultiplier;

  // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
  if (defender.name === 'a blessed wisp' && defender.life > 0) attacker.life += random(3) * c.lifeMultiplier;

  return { attacker, defender };
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
  // Round 1: fighterOne tries to hit fighterTwo.
  if (fighterOne.name !== 'a blessed wisp') {
    let { attacker, defender } = fightRound(fighterOne, fighterTwo);
    fighterOne = attacker;
    fighterTwo = defender;
  }

  // Round 2: fighterTwo tries to hit fighterOne.
  if (fighterTwo.name !== 'a blessed wisp') {
    let { attacker, defender } = fightRound(fighterTwo, fighterOne);
    fighterOne = defender;
    fighterTwo = attacker;
  }

  return {
    fighterOneLife: fighterOne.life,
    fighterTwoLife: fighterTwo.life,
  };
};

module.exports = resolveFight;
