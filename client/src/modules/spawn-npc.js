import { textSprite } from './text-sprite.js';
import { soundEffect } from './sound-effect.js';

const spawnNpc = (input) => {
  const {
    npc,
    particleTexture,
    camera
  } = input;

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
  
  return sprite;
};

export { spawnNpc };
