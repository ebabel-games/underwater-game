const { textSprite } = require('ebabel');

const addNameAboveSprite = (name, sprite) => {
  const text = textSprite({
    THREE,
    canvas: document.createElement('canvas'),
    text: name,
  });
  sprite.add(text);

  return {
    text,
    sprite,
  };
};

module.exports = addNameAboveSprite;
