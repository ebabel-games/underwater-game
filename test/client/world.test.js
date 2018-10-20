'strict';

const {
  mockTHREEx,
  mockTHREE,
  mockEG,
} = require('ebabel');

const world = require('../../client/src/modules/world');

let THREEx;
let THREE;
let EG;

beforeEach(() => {
  THREEx = mockTHREEx;
  THREE = mockTHREE;
  EG = mockEG;
});

test('world sets the expected default name in THREE.js scene', () => {
  const result = world({ THREE, THREEx, EG });
  expect(result.scene.name).toBe('underwater-game-world');
});
