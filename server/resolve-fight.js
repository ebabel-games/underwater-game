'strict';

const { dice, random } = require('ebabel');

const c = require('./constants');

const fightRound = (attacker, defender) => {
  const roundMessages = [];
  const roundActions = [];

  if (attacker.life <= 0 || defender.life <= 0) return { attacker, defender };

  let attackScore = attacker.attack - defender.defence;

  if (attackScore < c.minimumAttackScore) attackScore = c.minimumAttackScore;

  if (dice() <= attackScore) {
    const damage = dice() * c.lifeMultiplier;
    defender.life -= damage;
    roundMessages.push(`${attacker.name} hits ${defender.name} for ${damage} life.`);
    roundActions.push({
      agentName: attacker.name,
      agentType: attacker.constructor.name,
      name: 'hits',
      targetName: defender.name,
      targetType: defender.constructor.name,
      amount: damage,
    });
  } else {
    roundMessages.push(`${attacker.name} tries to hit ${defender.name} but misses.`);
    roundActions.push({
      agentName: attacker.name,
      agentType: attacker.constructor.name,
      name: 'misses',
      targetName: defender.name,
      targetType: defender.constructor.name,
      amount: 0,
    });
  }

  // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
  if (defender.name === 'a blessed wisp' && defender.life > 0) {
    const heal = random(3) * c.lifeMultiplier;
    attacker.life += heal;
    roundMessages.push(`${attacker.name} is healed for ${heal} life by ${defender.name}.`);
    roundActions.push({
      agentName: defender.name,
      agentType: defender.constructor.name,
      name: 'heals',
      targetName: attacker.name,
      targetType: attacker.constructor.name,
      amount: heal,
    });
  }

  return { attacker, defender, roundMessages, roundActions };
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
  const actions = [];

  // Round 1: fighterOne tries to hit fighterTwo.
  if (fighterOne.name !== 'a blessed wisp') {
    let { attacker, defender, roundMessages, roundActions } = fightRound(fighterOne, fighterTwo);
    fighterOne = attacker;
    fighterTwo = defender;
    Array.prototype.push.apply(fightMessages, roundMessages); // Note: faster than fightMessages.push(roundMessages);
    Array.prototype.push.apply(actions, roundActions);
  }

  // Round 2: fighterTwo tries to hit fighterOne.
  if (fighterTwo.name !== 'a blessed wisp') {
    let { attacker, defender, roundMessages, roundActions } = fightRound(fighterTwo, fighterOne);
    fighterOne = defender;
    fighterTwo = attacker;
    Array.prototype.push.apply(fightMessages, roundMessages);
    Array.prototype.push.apply(actions, roundActions);
  }

  return {
    fighterOneLife: fighterOne.life,
    fighterTwoLife: fighterTwo.life,
    fightMessages,
    actions,
  };
};

module.exports = resolveFight;
