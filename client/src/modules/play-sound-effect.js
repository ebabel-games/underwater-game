const playSoundEffect = (sprite, soundName) => {
  const sound = sprite.children.filter(c => c.type === 'Audio' && c.name === soundName);

  if (!sound || sound.length !== 1) {
    return;
  }

  sound[0].play();

  return sound[0];
}

const playerSoundEffect = (playerName, soundName) => {
  let player;

  if (EG.dataStore.player.name === playerName) {
    player = EG.scene.children.filter(c => c.name === playerName);
  }

  if (!player || player.length !== 1) {
    return;
  }

  return playSoundEffect(player[0], soundName);
};

const npcSoundEffect = (npc, soundName) => {
  if (!npc) {
    return;
  }

  return playSoundEffect(npc, soundName);
};

module.exports = {
  playerSoundEffect,
  npcSoundEffect,
};
