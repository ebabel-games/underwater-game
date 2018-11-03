'use strict';

const { updatePlayerPositionRotation } = require('ebabel');
const c = require('../constants');

// Get the new size or the minimum size of any wisp sprite.
const getNewSize = (life) => (life > c.npcMinimumSize) ? life : c.npcMinimumSize;

const render = (
    clock,
    scene,
    camera,
    renderer,
  ) => {
  // Calculate Delta.
  const delta = clock.getDelta();

  // Update position of camera based on where the player moves to.
  const hasPlayerMoved = updatePlayerPositionRotation(camera, EG.dataStore);

  // Update position and size of current player.
  const player = EG.scene && EG.scene.children.filter(child => child.name === EG.dataStore.player.name);
  if (player && player[0]) {
    player[0].position.set(...EG.dataStore.player.position);

    const newSize = getNewSize(EG.dataStore.player.life);
    player[0].scale.set(newSize, newSize, 1.0);
  }

  // If the player moved, broadcast to all other players her new position.
  if (hasPlayerMoved && EG.dataStore.player.name && EG.dataStore.player.position) {
    socket.emit('updatePlayerPosition', {
      name: EG.dataStore.player.name,
      position: EG.dataStore.player.position,
    });
  }

  // Update position and life of other players (not current one).
  const otherPlayerStates = Object.keys(EG.dataStore.otherPlayerStates).map((key) => EG.dataStore.otherPlayerStates[key]);
  if (otherPlayerStates && otherPlayerStates.length) {
    otherPlayerStates.map((otherPlayerState) => {
      const otherPlayer = EG.scene.children.filter(c => c.name === otherPlayerState.name);

      if (!otherPlayer || !otherPlayer.length || !otherPlayer[0].position) return;

      otherPlayer[0].position.set(...otherPlayerState.position);

      const newSize = getNewSize(otherPlayerState.life);
      otherPlayer[0].scale.set(newSize, newSize, 1.0);
    });
  }

  // Place the skybox in relation with the camera position.
  scene.children.filter(c => c.name === 'skybox')[0]
    .position.set(camera.position.x, camera.position.y, camera.position.z);

  // Update all npc.
  const npc = EG.scene && EG.scene.children.filter(child => child.name === 'npc-group');
  if (npc && npc.length && EG.dataStore.npcStates && EG.dataStore.npcStates.length) {
    // Update position and state of all npc.
    npc[0].children.map((child, index) => {
      // Skip npc if there is no matching state to update for same index.
      const newState = EG.dataStore.npcStates[index];
      if (!newState) {
        return;
      }

      // Update state from EG.dataStore.npcStates when there is one.
      child.userData.position =  newState.position;
      child.userData.life = newState.life;
      child.userData.fightMode = newState.fightMode;

      // Hide npc if it has no life.
      child.visible = child.userData.life > 0;

      // Update the size of npc based on its life.
      const newSize = getNewSize(child.userData.life);
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
    render(
      clock,
      scene,
      camera,
      renderer,
    );
  });

  return {
    delta,
    scene,
    clock,
    camera,
    renderer,
  };
};

module.exports = render;
