'strict';

const { audio, textSprite } = require('ebabel');

const audioConfig = (THREE, camera, name, url) => {
  return {
    THREE,
    camera,
    volume: EG.dataStore.defaultVolume,
    name,
    url,
    distance: 20,
  };
};

const spawnSprite = (input) => {
  const {
    spriteData,
    particleTexture,
    camera,
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
  const url = {};
  switch (sprite.name) {
    case 'a wisp':
      url.death = 'assets/sound-effects/spells/magicdrop.ogg';
      url.getHit = 'assets/sound-effects/battle-sound-effects/swish_2.wav';
      break;
    case 'an evil wisp':
      url.death = 'assets/sound-effects/spells/zap.ogg';
      url.getHit = 'assets/sound-effects/battle-sound-effects/swish_3.wav';
      break;
    case 'a blessed wisp':
      url.death = 'assets/sound-effects/spells/heal.ogg';
      url.getHit = 'assets/sound-effects/battle-sound-effects/swish_4.wav';
      break;
    default:
      // Players.
      url.death = 'assets/sound-effects/spells/disenchant.ogg';
      url.getHit = 'assets/sound-effects/qubodup-timehitwind/qubodup-megaswosh2.wav';
  }

  // Sound effect when the sprite dies.
  const deathSound = audio(audioConfig(THREE, camera, 'death', url.death));
  sprite.add(deathSound);

  // Sound effect when the sprite gets hit.
  const getHitSound = audio(audioConfig(THREE, camera, 'get-hit', url.getHit));
  sprite.add(getHitSound);

  // todo: Hit missing sound effect.

  return sprite;
};

module.exports = spawnSprite;
