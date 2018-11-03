const c = require('../constants');
const Sound = require('./sound');

const death = new Sound(0, 220, 1, 'triangle', 1, 0.2, 0, 0.2, 'bandpass', 10000, 440);
const hits = new Sound(0, 440, 0.2, 'triangle', 1, 0.2, 0, 0.2, 'bandpass', 10000, 440);
const misses = new Sound(0, 217, 0.2, 'triangle', 1, 0.2, 0, 0.2, 'bandpass', 10000, 440);
const heals = new Sound(0, 880, 0.2, 'triangle', 1, 0.2, 0, 0.2, 'bandpass', 10000, 440);

const playSoundEffect = (playerName, soundName) => {
  if (EG.dataStore.player.name !== playerName) {
    // Only play sound effects for the current player.
    return;
  }

  switch(soundName) {
    case c.soundNames.death:
      death.play();
      break;
    case c.soundNames.hits:
      hits.play();
      break;
    case c.soundNames.misses:
      misses.play();
      break;
    case c.soundNames.heals:
      heals.play();
      break;
    default:
      throw new Error('Unexpected sound name.');
  }

  return soundName;
}

module.exports = playSoundEffect;
