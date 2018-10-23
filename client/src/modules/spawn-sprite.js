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
      url.hits = 'assets/sound-effects/battle-sound-effects/swish_2.wav';
      url.misses = 'assets/sound-effects/battle-sound-effects/Bow.wav';
      url.heals = 'assets/sound-effects/healspell/healspell2.ogg';
      break;
    case 'an evil wisp':
      url.death = 'assets/sound-effects/spells/zap.ogg';
      url.hits = 'assets/sound-effects/battle-sound-effects/swish_3.wav';
      url.misses = 'assets/sound-effects/battle-sound-effects/Bow.wav';
      url.heals = 'assets/sound-effects/healspell/healspell2.ogg';
      break;
    case 'a blessed wisp':
      url.death = 'assets/sound-effects/spells/heal.ogg';
      url.hits = 'assets/sound-effects/battle-sound-effects/swish_4.wav';
      url.misses = 'assets/sound-effects/battle-sound-effects/Bow.wav';
      url.heals = 'assets/sound-effects/healspell/healspell2.ogg';
      break;
    default:
      // Players.
      url.death = 'assets/sound-effects/spells/disenchant.ogg';
      url.hits = 'assets/sound-effects/qubodup-timehitwind/qubodup-megaswosh2.wav';
      url.misses = 'assets/sound-effects/battle-sound-effects/Bow.wav';
      url.heals = 'assets/sound-effects/healspell/healspell2.ogg';
  }

  // Sound effect when the sprite dies.
  sprite.add(audio(audioConfig(THREE, camera, 'death', url.death)));

  // Sound effect when the sprite hits a target.
  sprite.add(audio(audioConfig(THREE, camera, 'hits', url.hits)));

  // Sound effect when the sprite misses a target.
  sprite.add(audio(audioConfig(THREE, camera, 'misses', url.misses)));

  // Sound effect when the sprite heals a target.
  sprite.add(audio(audioConfig(THREE, camera, 'heals', url.heals)));

  return sprite;
};

module.exports = spawnSprite;
