const { trait, positive, randomPosition } = require('./utils.js');

const createWisp = (name) => {
  const strength = trait();
  const stamina = trait();
  const agility = trait();
  const life = positive(stamina + agility - strength) || 1;

  return {
    name,
    strength,
    stamina,
    agility,
    life,
    attack: positive((strength * 3) - (agility * 1.5)) || 1,
    defence: positive((agility * 3) - (strength * 1.5)) || 1,
    position: randomPosition([9500, 9500, 9500]),
    fightMode: false,
    killList: [],
    color: [strength / 18, 0, agility / 18]
  };
};

module.exports = {
  createWisp
};
