const gameloop = require('node-gameloop');

const { random, randomPosOrNeg, distance, dice } = require('./utils.js');
const { createNpc } = require('./npc.js');

const minNpcPopulation = 66;
const maxNpcPopulation = 99;
const defaultFps = 10;
const agroDistance = 320;

// Main server-side game function.
// @io: socket.io
// @fps: number of frames per second.
module.exports = (input) => {
  const {
    io,
    dataStore,
    fps = defaultFps
  } = input;

  let frameCount = 0;
  let oneSecond = 0;

  // Main game loop that runs continuously.
  // Note: run gameloop.clearGameLoop(id); to stop the loop from running.
  const id = gameloop.setGameLoop((delta) => {
    // Move all npc sprites.
    dataStore.npc = dataStore.npc.map((n) => {
      // Sprites in fight mode must stop moving.
      if (n.state.fightMode) return n;

      const direction = random(3);
      switch (direction) {
        case 1:
          n.state.position[0] += randomPosOrNeg(20);
          break;
        case 2:
          n.state.position[1] += randomPosOrNeg(20);
          break;
        default:
          n.state.position[2] += randomPosOrNeg(20);
      }
      return n;
    });

    // Update positions for all npc after their move.
    const npcPositions = dataStore.npc.map((n) => n.state.position);
    io.emit('updateNpcPositions', npcPositions);

    // All npc that are close to each other will fight (bar exceptions).
    const l = dataStore.npc.length;
    for (let i = 0; i < l; i++) {
      // Attacking npc.
      const attackNpc = dataStore.npc[i];

      // Skip the attacks of npc that are dead or pacifist.
      if (attackNpc.state.life <= 0 || attackNpc.name === 'a blessed wisp') continue;

      for (let i2 = 0; i2 < l; i2++) {
        // Defending npc.
        const defenceNpc = dataStore.npc[i2];

        // Skip npc that are already dead.
        if (defenceNpc.state.life <= 0) continue;

        // Skip the npc attacking himself.
        if (i === i2) continue;

        // Calculate distance from attackNpc to defenceNpc.
        const _distance = distance(attackNpc.state.position, defenceNpc.state.position);

        // Skip npc that are too far appart to fight each other.
        if (_distance > agroDistance) continue;

        // Set both npc fightMode to true, so they stop moving.
        attackNpc.state.fightMode = true;
        defenceNpc.state.fightMode = true;

        // Fight resolutions.
        let attackBonus = attackNpc.state.attack - defenceNpc.state.defence;
        if (attackBonus < 2) attackBonus = 2;
        let message;
        if (dice() <= attackBonus) {
          const damage = dice();
          defenceNpc.state.life -= damage;
          message = `${attackNpc.state.name} bites ${defenceNpc.state.name} for ${damage} damage${damage > 1 ? 's' : ''}.`;
        } else {
          message = `${attackNpc.state.name} tries to bite ${defenceNpc.state.name} but misses.`;
        }
        io.emit('chatMessage', message);

        // When a blessed wisp gets attacked, if he still alive, he will heal the attacking npc.
        if (defenceNpc.state.name === 'a blessed wisp' && defenceNpc.state.life > 0) {
          const healing = random(3);
          attackNpc.state.life += healing;
          const message = `${attackNpc.state.name} is healed for ${healing} life by ${defenceNpc.state.name}!`;
          io.emit('chatMessage', message);
        }

        // When defence npc dies, boost life of attack npc, update his kill list.
        if (defenceNpc.state.life <= 0) {
          attackNpc.state.fightMode = false;
          const bonusLife = dice() + dice() + dice();
          attackNpc.state.life += bonusLife;
          attackNpc.state.killList.push(defenceNpc.state.name);
          let message = `${defenceNpc.state.name} has died, eaten by ${attackNpc.state.name}.`;
          io.emit('chatMessage', message);

          message = `${attackNpc.state.name} wins a bonus ${bonusLife} life!`;
          io.emit('chatMessage', message);
        }
      }
    }

    // Update life, and fightMode for all npc after their fights.
    const npcStates = dataStore.npc.map((n) => {
      return {
        life: n.state.life,
        fightMode: n.state.fightMode,
      };
    });
    io.emit('updateNpcState', npcStates);

    // Runs every 1 second.
    oneSecond += delta;
    // Spawn very fast if the population is lower than minimum npc population,
    // or spawn every second if npc population is less than maximum population.
    if ((oneSecond > 1 && dataStore.npc.length < maxNpcPopulation) || dataStore.npc.length < minNpcPopulation) {
      // Random changes to spawn a certain npc.
      const spawnChance = random(99);
      switch (spawnChance) {
        case 33:
          dataStore.npc.push(createNpc(io, 'a blessed wisp'));
          break;
        case 6:
        case 66:
          dataStore.npc.push(createNpc(io, 'an evil wisp'));
          break;
        default:
          dataStore.npc.push(createNpc(io));
      }

      // Reset.
      oneSecond = 0;
    }

    frameCount = frameCount + 1;
  }, 1000 / fps);
};
