import { chatMessage } from './modules/chat-message.js';
import { world } from './modules/world.js';
import { render } from './modules/render.js';
import { textSprite } from './modules/text-sprite.js';
import { soundEffect } from './modules/sound-effect.js';

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc-group';

// Main game module that co-ordinates all other modules.
const game = (THREE, THREEx) => {
  chatMessage();
  const { scene, clock, camera, renderer } = world({ THREE, THREEx }); /* no-unused-var: 0 */
  render(scene, clock, camera, renderer);

  // Link scene to dataStore.
  dataStore.scene = scene;

  // Spawn npc.
  socket.on('spawnNpc', (npc) => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: particleTexture, color: 0xffffff });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = npc.creation.name;
    sprite.scale.set(npc.creation.life, npc.creation.life, 1.0);
    sprite.position.set(...npc.creation.position);
    sprite.material.color.setHSL(npc.creation.color[0], npc.creation.color[1], npc.creation.color[2]); 
    sprite.material.blending = THREE.AdditiveBlending;
    sprite.userData = npc;

    // Name above sprite.
    const text = textSprite(npc.creation.name);
    sprite.add(text);

    // Add sound effect to sprite.
    const sound = soundEffect({ camera });
    sprite.add(sound);
    
    particleGroup.add(sprite);
    dataStore.scene.add(particleGroup);
  });

  // Update npc states.
  socket.on('updateNpcStates', (npcStates) => {
    dataStore.npcStates = npcStates;
  });

  return {
    scene,
    clock,
    camera,
    renderer
  };
};

game(THREE, THREEx);

export { game };
