'strict';

const Player = require('../../server/player');

test('Player constructor without any input throws an error.', () => {
  try {
    new Player();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe('Missing input parameters.');
  }
});
