import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';

// Main game module that co-ordinates all other modules.
const game = (socket, THREE, THREEx) => {
  chatMessage(socket);
  const { scene, clock, camera, renderer } = world(THREE, THREEx); /* no-unused-var: 0 */
  render(scene, clock, camera, renderer);
};

game(socket, THREE, THREEx);

export { game };
