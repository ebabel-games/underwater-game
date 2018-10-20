'strict';

const { mockEG, mockIo } = require('ebabel');

const game = require('../../server/game');

let EG;
let io;

beforeEach(() => {
  EG = mockEG;
  io = mockIo;
  global.dataStore = EG.dataStore;
  global.dataStore.npc = [];
});

test('game can be called without fps input but will still run without throwing an error and returns a gameloop id 0.', () => {
  const result = game({ io });
  expect(result).toBe(0);
});
