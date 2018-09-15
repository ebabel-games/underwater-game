const { positive, randomPosition } = require('./utils.js');

const createEvilWisp = (name) => {
  const strength = 18;
  const stamina = 18;
  const agility = 1;
  const life = 6;

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
    color: [1, 0, 0]
  };
};

module.exports = {
  createEvilWisp
};
