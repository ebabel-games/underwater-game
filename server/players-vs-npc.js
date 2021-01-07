'strict';

const { distance } = require('ebabel');

const c = require('./constants');
const resolveFight = require('./resolve-fight');

const playersVsNpc = (players, npc, io) => {
  const l = (players && Object.keys(players).length) || 0;
  const l2 = (npc && npc.length) || 0;

  if (l === 0 || l2 === 0) return { players, npc };

  Object.keys(players).map((name) => {
    const player = players[name];

    if (player.life <= 0) return;

    for (let i2 = 0; i2 < l2; i2++) {
      // If the player died with a previous sprite in this loop, skip all sprites.
      if (player.life <= 0) continue;

      // Opponent npc.
      const opponentNpc = npc[i2];
  
      // Calculate distance from player to opponentNpc.
      const _distance = distance(player.position, opponentNpc.position);
  
      // Skip npc that are too far appart to fight each other, or player with no life.
      if (_distance > c.agroDistance || player.life <= 0) continue;
  
      // Set npc fightMode to true, so it stops moving in a random direction.
      player.fightMode = true;
      opponentNpc.fightMode = true;

      // Update all clients the current player is in fightMode.
      EG.io.emit('updatePlayerFightMode', { name: player.name, fightMode: true });
  
      // Fight resolution.
      const { fighterOneLife, fighterTwoLife, fightMessages, actions } = resolveFight(player, opponentNpc);

      // Update player and opponent npc life.
      player.life = fighterOneLife;
      opponentNpc.life = fighterTwoLife;

      // Update all clients the current player has lost or gained life.
      EG.io.emit('updatePlayerLife', { name: player.name, life: player.life });

      // Message only the relevant player that she lost or gained life.
      fightMessages.map((fightMessage) => EG.io.to(player.socketId).emit('chatMessage', fightMessage));

      // Message only the relevant player the actions involving herself and sprites she interacts with.
      actions.map((action) => EG.io.to(player.socketId).emit('action', action));

      // Update dataStore.
      players[player.name].life = fighterOneLife;
      global.dataStore.players[player.name].life = fighterOneLife;

      // Reset fightMode of opponentNpc if the player lost all life and opponentNpc is still alive.
      if (player.life <= 0 && opponentNpc.life > 0) {
        opponentNpc.fightMode = false;
        EG.io.emit('updatePlayerFightMode', { name: player.name, fightMode: false });
      }

      // Reset fightMode of player if the opponentNpc lost all life and player is still alive.
      if (opponentNpc.life <= 0 && player.life > 0) {
        player.fightMode = false;
        EG.io.emit('updatePlayerFightMode', { name: player.name, fightMode: false });
      }

      // If player has just died, signal this to all players.
      if (fighterOneLife <= 0) {
        EG.io.emit('playerDied', player.name);
      }
    }
  });

  return { players, npc };
};

module.exports = playersVsNpc;
