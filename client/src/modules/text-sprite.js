const textSprite = (text) => {
  const fontface = 'Verdana';
  const fontsize = 32;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontsize}px ${fontface}`;
  context.fillStyle = 'rgba(255, 255, 255)';
  context.fillText(text, 0, fontsize);
  const texture = new THREE.Texture(canvas)
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.name = 'text';
  sprite.scale.set(2, 1, 1.0);
  sprite.center.set(0, 1);

  return sprite;
};

export { textSprite };
