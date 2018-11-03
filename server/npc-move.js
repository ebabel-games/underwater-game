'use strict';

const { random, randomPosOrNeg } = require('ebabel');

// Move all npc.
const npcMove = (npc) => npc.map((n) => {
  // Sprites in fight mode and still alive must stop moving.
  if (n.fightMode && n.life > 0) return n;

  // Sprites that are dead should float up to the surface.
  if (n.life <= 0) {
    n.position[1] = n.position[1] + 10;
    return n;
  }

  // Sprites that are still alive get to move normally.
  const direction = random(3);
  switch (direction) {
    case 1:
      n.position[0] += randomPosOrNeg(20);
      break;
    case 2:
      n.position[1] += randomPosOrNeg(20);
      break;
    default:
      n.position[2] += randomPosOrNeg(20);
  }
  return n;
});

module.exports = npcMove;
