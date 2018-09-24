import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';
import { globalEventHandlers } from './modules/global-event-handlers.js';
import { spawnSprite } from './modules/spawn-sprite.js';

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc-group';

const addNpc = (sprite) => {
  particleGroup.add(sprite);
  dataStore.scene.add(particleGroup);
}

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
      addNpc(spawnSprite({ spriteData: npc, particleTexture, camera }));
    });
  });

  // Spawn single npc.
  socket.on('spawnSprite', (npc) => {
    addNpc(spawnSprite({ spriteData: npc, particleTexture, camera }));
  });

  // Update npc states.
  socket.on('updateNpcStates', (npcStates) => {
    dataStore.npcStates = npcStates;
  });

  // Spawn a player.
  socket.on('spawnPlayer', (player) => {
    dataStore.player = player;
    dataStore.scene.add(spawnSprite({ spriteData: player, particleTexture, camera }));
  });

  // Spawn player other than the current one.
  // Note: this other player has spawned after the current one started playing.
  socket.on('spawnOtherPlayer', (player) => {
    dataStore.otherPlayerStates[player.name] = player;
    dataStore.scene.add(spawnSprite({ spriteData: player, particleTexture, camera }));
  });

  // Update state of a player other than current one.
  socket.on('updateOtherPlayerStates', (playerState) => {
    dataStore.otherPlayerStates[playerState.name] = playerState;

    // If that player state isn't in the scene of current player, add that other player now.
    const otherPlayerExists = dataStore.scene.children.filter(otherPlayer => otherPlayer.name === playerState.name).length;
    if (!otherPlayerExists) {
      // Note: this other player had already spawned before the current one started playing.
      dataStore.scene.add(spawnSprite({ spriteData: {creation: null, state: playerState}, particleTexture, camera }));
    }
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
