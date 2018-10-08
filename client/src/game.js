'strict';

const init = require('./modules/init');
const chatMessage = require('./modules/chat-message');
const world = require('./modules/world');
const render = require('./modules/render');
const globalEventHandlers = require('./modules/global-event-handlers');

// Main game module that co-ordinates all other modules.
const game = (THREE, THREEx, dataStore) => {
  chatMessage();
  const { scene, clock, camera, renderer } = world({ THREE, THREEx, dataStore }); /* no-unused-var: 0 */
  render(scene, clock, camera, renderer);

  // Link scene and camera to dataStore.
  dataStore.scene = scene;
  dataStore.camera = camera;

  // Initialise the socket listeners.
  init(camera);

  // Register all global event handlers.
  globalEventHandlers();

  return {
    scene,
    clock,
    camera,
    renderer
  };
};

game(THREE, THREEx, dataStore);

module.exports = game;
