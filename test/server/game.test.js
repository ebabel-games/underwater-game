'strict';

const game = require('../../server/game');

const { mockEG } = require('ebabel');

let io;
let EG;

beforeEach(() => {
  // Mock io.
  io = {
    emit: () => {},
  };

  EG = mockEG;
  global.dataStore = EG.dataStore;
  global.dataStore.npc = [];
});

test('game can be called without fps input but will still run without throwing an error and returns a gameloop id 0.', () => {
  const result = game({ io });
  expect(result).toBe(0);
});
