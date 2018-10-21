'strict';

const { audio, textSprite } = require('ebabel');

const spawnSprite = (input) => {
  const {
    spriteData,
    particleTexture,
    camera
  } = input;

  const spriteMaterial = new THREE.SpriteMaterial({ map: particleTexture, color: 0xffffff });
  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.name = spriteData.name;
  sprite.scale.set(spriteData.life, spriteData.life, 1.0);
  sprite.position.set(...spriteData.position);
  sprite.material.color.setHSL(spriteData.color[0], spriteData.color[1], spriteData.color[2]); 
  sprite.material.blending = THREE.AdditiveBlending;
  sprite.userData = spriteData;

  // Name above sprite.
  const text = textSprite({
    THREE,
    canvas: document.createElement('canvas'),
    text: spriteData.name,
  });
  sprite.add(text);

  // Death sound effect.
  const sound = audio({
    THREE,
    camera,
    volume: EG.dataStore.defaultVolume,
    name: 'death',
    url: 'assets/sound-effects/spells/heal.ogg',
    distance: 20,
  });
  sprite.add(sound);

  // todo: Hit missing sound effect.
  // todo: Hit landing sound effect.
  // todo: A very large hit landing sound effect.
  // todo: Player dying sound effect.

  return sprite;
};

module.exports = spawnSprite;
