const { trait, positive, randomPosition } = require('./utils.js');

module.exports = {
  // Create a new Non Playing Character.
  createNpc: (io) => {
    // Creation characteristics. These will never change in the creation object.
    const strength = trait();
    const stamina = trait();
    const agility = trait();
    const life = positive(stamina + agility - strength) || 1;

    const creation = {
      name: 'a wisp',
      strength,
      stamina,
      agility,
      life,
      attack: positive((strength * 3) - (agility * 1.5)) || 1,
      defence: positive((agility * 3) - (strength * 1.5)) || 1,
      position: randomPosition([1000, 1000, 1000]),
      fightMode: false,
      killList: []
    };

    // State will change based on how the npc evolves.
    // Deep copy from creation, so that state stays separate.
    const state = JSON.parse(JSON.stringify(creation));

    io.emit('spawnNpc', { creation, state });
    io.emit('chatMessage', `${creation.name} spawned with ${creation.life} life at ${creation.position}.`);

    return {
      creation,
      state
    };
  }
};
