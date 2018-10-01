const { random, distance } = require('ebabel');
const { reducedDistance, dice } = require('./utils');

const agroDistance = 1000;

// All npc that are close enough enter into a fight with each other.
const npcFight = (npc) => {
  const l = npc.length;

  for (let i = 0; i < l; i++) {
    // Attacking npc.
    const attackNpc = npc[i];

    // Skip the attacks of npc that are dead or pacifist.
    if (attackNpc.state.life <= 0 || attackNpc.state.name === 'a blessed wisp') continue;

    for (let i2 = 0; i2 < l; i2++) {
      // Defending npc.
      const defenceNpc = npc[i2];

      // Skip npc that are already dead.
      if (defenceNpc.state.life <= 0) continue;

      // Skip the npc attacking himself.
      if (i === i2) continue;

      // Calculate distance from attackNpc to defenceNpc.
      const _distance = distance(attackNpc.state.position, defenceNpc.state.position);

      // Skip npc that are too far appart to fight each other.
      if (_distance > agroDistance) continue;

      // Set both npc fightMode to true, so they stop moving in a random direction.
      attackNpc.state.fightMode = true;
      defenceNpc.state.fightMode = true;

      // When fighting npc are within agro range but not that close, move them closer to each other.
      if (_distance > 40) {
        attackNpc.state.position =
          reducedDistance(attackNpc.state.position, defenceNpc.state.position, 1);
      }
      
      // Fight resolutions.
      let attackBonus = attackNpc.state.attack - defenceNpc.state.defence;
      if (attackBonus < 2) attackBonus = 2;
      if (dice() <= attackBonus) {
        const damage = dice();
        defenceNpc.state.life -= damage;
      }

      // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
      if (defenceNpc.state.name === 'a blessed wisp' && defenceNpc.state.life > 0) {
        const healing = random(3);
        attackNpc.state.life += healing;
      }

      // When defence npc dies, the attack npc gets his all his default creation life back,
      // and a random bonus. However, if the bonus would be less than the npc currently has in life,
      // then he keeps that same state life.
      if (defenceNpc.state.life <= 0) {
        attackNpc.state.fightMode = false;
        const bonusLife = attackNpc.creation.life + dice();
        attackNpc.state.life = (attackNpc.state.life < bonusLife) ? bonusLife : attackNpc.state.life;
      }
    }
  }

  return npc;
};

module.exports = {
  npcFight,
};
