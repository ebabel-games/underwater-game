const { updatePlayerPositionRotation } = require('ebabel');

const npcMinimumSize = 20;

const render = (scene, clock, camera, renderer) => {
  // Calculate Delta.
  const delta = clock.getDelta();

  // Update position of camera based on where the player moves to.
  const hasPlayerMoved = updatePlayerPositionRotation(camera, dataStore);

  // Update position and rotation of current player.
  const player = dataStore.scene && dataStore.scene.children.filter(child => child.name === dataStore.player.name);
  if (player && player[0]) {
    player[0].position.set(...dataStore.player.position);
  }

  // If the player moved, broadcast to all other players her new position, and other useful state values.
  if (hasPlayerMoved && dataStore.player.name && dataStore.player.position) {
    socket.emit('updatePlayerState', {
      name: dataStore.player.name,
      life: dataStore.player.life,
      position: dataStore.player.position,
      color: dataStore.player.color,
      attack: dataStore.player.attack,
      defence: dataStore.player.defence,
      fightMode: dataStore.player.fightMode,
      rotation: dataStore.player.rotation
    });
  }

  // Update position and rotation of other players (not current one).
  const otherPlayerStates = Object.keys(dataStore.otherPlayerStates).map((key) => dataStore.otherPlayerStates[key]);
  if (otherPlayerStates && otherPlayerStates.length) {
    otherPlayerStates.map((otherPlayerState) => {
      const otherPlayer = dataStore.scene.children.filter(c => c.name === otherPlayerState.name);

      if (!otherPlayer || !otherPlayer.length || !otherPlayer[0].position) return;

      otherPlayer[0].position.set(...otherPlayerState.position);
      otherPlayer[0].rotation.set(...otherPlayerState.rotation);
    });
  }

  // Place the skybox in relation with the camera position.
  scene.children.filter(c => c.name === 'skybox')[0]
    .position.set(camera.position.x, camera.position.y, camera.position.z);

  const npc = dataStore.scene && dataStore.scene.children.filter(child => child.name === 'npc-group');
  if (npc && npc.length && dataStore.npcStates && dataStore.npcStates.length) {
    // Update position and state of all npc.
    npc[0].children.map((child, index) => {
      // Skip npc  if there is no matching state to update for same index.
      const newState = dataStore.npcStates[index];
      if (!newState) {
        return;
      }

      // Npc just died, play its death sound.
      if (child.userData.life > 0 && newState.life <= 0) {
        child.children.filter((c) => c.name === 'death')[0].play();
      }

      // Update state from dataStore.npcStates when there is one.
      child.userData.position =  newState.position;
      child.userData.life = newState.life;
      child.userData.fightMode = newState.fightMode;

      // Minimum size of any npc.
      const newSize = (child.userData.life > npcMinimumSize) ? child.userData.life : npcMinimumSize;

      // Update the size of npc based on its life.
      child.scale.set(newSize, newSize, 1.0);

      // Update npc new position.
      child.position.set(
        child.userData.position[0],
        child.userData.position[1],
        child.userData.position[2]
      );
    });
  }

  // Render the scene.
  renderer.render(scene, camera);
  requestAnimationFrame(() => {
    render(scene, clock, camera, renderer);
  });

  return {
    delta,
    scene,
    clock,
    camera,
    renderer
  };
};

module.exports = {
  render,
};
