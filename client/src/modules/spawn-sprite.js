const { soundEffect, textSprite } = require('ebabel');

const spawnSprite = (input) => {
  const {
    spriteData,
    particleTexture,
    camera
  } = input;

  const spriteMaterial = new THREE.SpriteMaterial({ map: particleTexture, color: 0xffffff });
  const sprite = new THREE.Sprite(spriteMaterial);

  // If state is null or missing, use creation.
  const data = spriteData.state || spriteData.creation || spriteData;

  sprite.name = data.name;
  sprite.scale.set(data.life, data.life, 1.0);
  sprite.position.set(...data.position);
  sprite.material.color.setHSL(data.color[0], data.color[1], data.color[2]); 
  sprite.material.blending = THREE.AdditiveBlending;
  sprite.userData = { creation: data, state: data };

  // Name above sprite.
  const text = textSprite({
    THREE,
    canvas: document.createElement('canvas'),
    text: data.name,
  });
  sprite.add(text);

  // Add sound effect to sprite.
  const sound = soundEffect({
    THREE,
    camera,
    name: 'death',
    url: 'assets/sound-effects/spells/heal.ogg',
  });
  sprite.add(sound);
  
  return sprite;
};

module.exports = {
  spawnSprite,
};
