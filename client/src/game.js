import { init } from './modules/init.js';
import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';
import { globalEventHandlers } from './modules/global-event-handlers.js';

// Main game module that co-ordinates all other modules.
const game = (THREE, THREEx) => {
  chatMessage();
  const { scene, clock, camera, renderer } = world({ THREE, THREEx }); /* no-unused-var: 0 */
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

game(THREE, THREEx);

export { game };
