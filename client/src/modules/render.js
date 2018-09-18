import { updateCamera } from './keyboard-controls.js';

const render = (scene, clock, camera, renderer) => {
  const delta = clock.getDelta(); // Calculate Delta.

  updateCamera(camera);

  // Place the skybox in relation with the camera position.
  scene.children[1].position.set(camera.position.x, camera.position.y, camera.position.z);

  // Update position and state of all npc.
  const npc = dataStore.scene && dataStore.scene.children.filter(child => child.name === 'npcGroup');
  if (npc && npc.length && dataStore.npcPositions && dataStore.npcPositions.length) {
    npc[0].children.map((child, index) => {
      // Update state from dataStore.npcStates when there is one.
      const newState = dataStore.npcStates[index];
      if (dataStore.npcStates && newState) {
        child.userData.state.life = newState.life;
        child.userData.state.fightMode = newState.fightMode;
      }

      // Change appearance of npc that are no longer alive.
      if (child.userData.state.life <= 0) {
        child.material.color.set('rgb(50, 50, 50)');
        child.children[0].material.color.set('rgb(200, 200, 200)');
      }

      // Skip npc  if there is no matching position to update for same index.
      if (!dataStore.npcPositions[index]) {
        return;
      }

      // Update the size of npc based on its life.
      const newSize = (child.userData.state.life > 2) ? child.userData.state.life * 20 : 40;
      child.scale.set(newSize, newSize, 1.0);

      // Update npc new position.
      if (child.position.x !== dataStore.npcPositions[index][0]) {
        child.position.x = dataStore.npcPositions[index][0];
      }

      if (child.position.y !== dataStore.npcPositions[index][1]) {
        child.position.y = dataStore.npcPositions[index][1];
      }

      if (child.position.z !== dataStore.npcPositions[index][2]) {
        child.position.z = dataStore.npcPositions[index][2];
      }
    });
  }

  // Render the scene.
  renderer.render(scene, camera);
  requestAnimationFrame((timestamp) => {
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

export { render };
