'strict';

const { distance, reducedDistance, dice } = require('ebabel');

const c = require('./constants');
const resolveFight = require('./resolve-fight');

// All npc that are close enough enter into a fight with each other.
const npcVsNpc = (npc) => {
  const l = npc.length;

  for (let i = 0; i < l; i++) {
    // Attacking npc.
    const attackNpc = npc[i];

    // Skip the attacks of npc that are dead or pacifist.
    if (attackNpc.life <= 0 || attackNpc.name === 'a blessed wisp') continue;

    for (let i2 = 0; i2 < l; i2++) {
      // Defending npc.
      const defenceNpc = npc[i2];

      // Skip npc that are already dead.
      if (defenceNpc.life <= 0) continue;

      // Skip the npc attacking himself.
      if (i === i2) continue;

      // Calculate distance from attackNpc to defenceNpc.
      const _distance = distance(attackNpc.position, defenceNpc.position);

      // Skip npc that are too far appart to fight each other.
      if (_distance > c.agroDistance) continue;

      // Set both npc fightMode to true, so they stop moving in a random direction.
      attackNpc.fightMode = true;
      defenceNpc.fightMode = true;

      // When fighting npc are within agro range but not that close, move them closer to each other.
      if (_distance > 40) attackNpc.position =
        reducedDistance(attackNpc.position, defenceNpc.position, 1);
      
      // Fight resolution.
      const { fighterOneLife, fighterTwoLife } = resolveFight(attackNpc, defenceNpc);
      attackNpc.life = fighterOneLife;
      defenceNpc.life = fighterTwoLife;

      // When an npc dies, the other npc gets all his respawnedLife back.
      // However, if the respawned life would be less than the npc currently has in life,
      // then he keeps that same life he already has.
      if (defenceNpc.life <= 0) {
        attackNpc.fightMode = false;
        attackNpc.life = (attackNpc.life < attackNpc.respawnedLife) ? attackNpc.respawnedLife : attackNpc.life;
      }
      if (attackNpc.life <= 0) {
        defenceNpc.fightMode = false;
        defenceNpc.life = (defenceNpc.life < defenceNpc.respawnedLife) ? defenceNpc.respawnedLife : defenceNpc.life;
      }
    }
  }

  return npc;
};

module.exports = npcVsNpc;
