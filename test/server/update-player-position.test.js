'strict';

const updatePlayerPosition = require('../../server/update-player-position');

test('updatePlayerPosition returns undefined when socket input is missing', () => {
  const result = updatePlayerPosition();
  expect(result).toBe(undefined);
});
