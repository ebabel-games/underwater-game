'strict';

const { random, distance, reducedDistance, dice } = require('ebabel');

const agroDistance = 1000;

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
      if (_distance > agroDistance) continue;

      // Set both npc fightMode to true, so they stop moving in a random direction.
      attackNpc.fightMode = true;
      defenceNpc.fightMode = true;

      // When fighting npc are within agro range but not that close, move them closer to each other.
      if (_distance > 40) {
        attackNpc.position =
          reducedDistance(attackNpc.position, defenceNpc.position, 1);
      }
      
      // Fight resolutions.
      let attackBonus = attackNpc.attack - defenceNpc.defence;
      if (attackBonus < 2) attackBonus = 2;
      if (dice() <= attackBonus) {
        const damage = dice();
        defenceNpc.life -= damage;
      }

      // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
      if (defenceNpc.name === 'a blessed wisp' && defenceNpc.life > 0) {
        const healing = random(3);
        attackNpc.life += healing;
      }

      // When defence npc dies, the attack npc gets his all his respawnedLife back,
      // and a random bonus. However, if the bonus would be less than the npc currently has in life,
      // then he keeps that same state life.
      if (defenceNpc.life <= 0) {
        attackNpc.fightMode = false;
        const bonusLife = attackNpc.respawnedLife + dice();
        attackNpc.life = (attackNpc.life < bonusLife) ? bonusLife : attackNpc.life;
      }
    }
  }

  return npc;
};

module.exports = npcVsNpc;
