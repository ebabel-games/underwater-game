const { world } = require('../client/src/modules/world');
const { mockTHREEx, mockTHREE, mockDataStore } = require('./mocks');

let THREEx;
let THREE;
let dataStore;

beforeEach(() => {
  THREEx = mockTHREEx;
  THREE = mockTHREE;
  dataStore = mockDataStore;
});

test('world sets the expected default name in THREE.js scene', () => {
  const result = world({ THREE, THREEx, dataStore });
  expect(result.scene.name).toBe('underwater-game-world');
});
