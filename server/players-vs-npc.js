const { distance } = require('ebabel');

const agroDistance = 1000;

const playersVsNpc = (players, npc) => {
  const l = (players && Object.keys(players).length) || 0;
  const l2 = (npc && npc.length) || 0;

  if (l === 0 || l2 === 0) return { players, npc };


  // for (let i2 = 0; i2 < l; i2++) {
  //   // Defending npc.
  //   const defenceNpc = npc[i2];

  //   // Calculate distance from attackNpc to defenceNpc.
  //   const _distance = distance(player.position, defenceNpc.position);

  //   // Skip npc that are too far appart to fight each other.
  //   if (_distance > agroDistance) continue;

  //   // Set npc fightMode to true, so it stops moving in a random direction.
  //   defenceNpc.fightMode = true;

  //   // todo: replace this automatic loss of life for npc by an actual fight.
  //   console.log(defenceNpc);
  //   defenceNpc.life = defenceNpc.life - 50;
  //   console.log(defenceNpc);
  // }

  return { players, npc };
};

module.exports = playersVsNpc;
