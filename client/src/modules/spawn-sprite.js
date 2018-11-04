'use strict';

const addNameAboveSprite = require('./add-name-above-sprite');

const spawnSprite = (input) => {
  const {
    spriteData,
    particleTexture,
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
  addNameAboveSprite(spriteData.name, sprite);

  // todo: add one animation that loops continuously, with a view to
  // have multiple animations for different situations (hits, misses, death, for example).


  return sprite;
};

module.exports = spawnSprite;
