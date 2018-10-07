const { distance } = require('ebabel');

const agroDistance = 1000;

const playerVsNpc = (player, npc) => {
  if (player.life <= 0) return { player, npc };

  const l = npc.length;

  for (let i2 = 0; i2 < l; i2++) {
    // Defending npc.
    const defenceNpc = npc[i2];

    // Calculate distance from attackNpc to defenceNpc.
    const _distance = distance(player.position, defenceNpc.position);

    // Skip npc that are too far appart to fight each other.
    if (_distance > agroDistance) continue;

    // Set npc fightMode to true, so it stops moving in a random direction.
    defenceNpc.fightMode = true;

    // todo: replace this automatic loss of life for npc by an actual fight.
    defenceNpc.life -= 10;
  }

  return { player, npc };
};

module.exports = playerVsNpc;
