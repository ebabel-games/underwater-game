import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';
import { globalEventHandlers } from './modules/global-event-handlers.js';
import { spawnNpc } from './modules/spawn-npc.js';

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc-group';

// Main game module that co-ordinates all other modules.
const game = (THREE, THREEx) => {
  chatMessage();
  const { scene, clock, camera, renderer } = world({ THREE, THREEx }); /* no-unused-var: 0 */
  render(scene, clock, camera, renderer);

  // Link scene and camera to dataStore.
  dataStore.scene = scene;
  dataStore.camera = camera;

  // Spawn multiple npc.
  socket.on('spawnMultipleNpc', (multipleNpc) => {
    multipleNpc.map((npc) => {
      spawnNpc({ npc, particleTexture, particleGroup, camera });
    });
  });

  // Spawn single npc.
  socket.on('spawnNpc', (npc) => {
    spawnNpc({ npc, particleTexture, particleGroup, camera });
  });

  // Update npc states.
  socket.on('updateNpcStates', (npcStates) => {
    dataStore.npcStates = npcStates;
  });

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
