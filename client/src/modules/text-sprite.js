const scaleWidthFactor = 0.002090;

const textSprite = (text) => {
  const fontface = 'Verdana';
  const fontsize = 32;
  const canvas = document.createElement('canvas');

  const context = canvas.getContext('2d');
  context.font = `${fontsize}px ${fontface}`;
  context.fillStyle = '#ffffff';
  context.fillText(text, 10, fontsize);

  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.name = 'text';
  sprite.scale.set(2, 1, 1.0);

  // Dynamically centre based on actual size of text.
  const size = context.measureText(text);
  sprite.center.set(size.width * scaleWidthFactor, 0.4);

  return sprite;
};

module.exports = {
  textSprite,
};
