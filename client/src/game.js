import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';

const dataStore = {
  scene: null
};

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc';
particleGroup.position.y = 55;
const particleAttributes = { startSize: [], startPosition: [], randomness: [] };

// Main game module that co-ordinates all other modules.
const game = (socket, THREE, THREEx) => {
  chatMessage(socket);
  const { scene, clock, camera, renderer } = world(socket, dataStore, THREE, THREEx); /* no-unused-var: 0 */
  render(socket, dataStore, scene, clock, camera, renderer);

  // Link scene to dataStore.
  dataStore.scene = scene;

  // Spawn npc.
  socket.on('spawnNpc', (npc) => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: particleTexture, color: 0xffffff });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(npc.creation.life * 20, npc.creation.life * 20, 1.0);
    sprite.position.set(...npc.creation.position);
    sprite.material.color.setRGB(...npc.creation.color);
    sprite.material.blending = THREE.AdditiveBlending;
    sprite.userData = npc;

    particleGroup.add(sprite);
    particleAttributes.startPosition.push(sprite.position.clone());
    particleAttributes.randomness.push(Math.random());
    dataStore.scene.add(particleGroup);
  });

  return {
    socket,
    scene,
    clock,
    camera,
    renderer
  };
};

game(socket, THREE, THREEx);

export { game };
