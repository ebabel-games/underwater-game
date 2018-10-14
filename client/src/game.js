'strict';

const init = require('./modules/init');
const chatMessage = require('./modules/chat-message');
const world = require('./modules/world');
const render = require('./modules/render');
const globalEventHandlers = require('./modules/global-event-handlers');

// Main game module that co-ordinates all other modules.
const game = (THREE, THREEx, dataStore) => {
  chatMessage();

  const {
    clock,
    scene,
    camera,
    renderer,
  } = world({ THREE, THREEx, dataStore }); /* no-unused-var: 0 */

  render(
    clock,
    scene,
    camera,
    renderer,
  );

  // Link scene and camera to EG namespace.
  EG.scene = scene;
  EG.camera = camera;

  // Initialise the socket listeners.
  init(camera);

  // Register all global event handlers.
  globalEventHandlers();

  return {
    clock,
    scene,
    camera,
    renderer,
  };
};

game(THREE, THREEx, EG.dataStore);

module.exports = game;
