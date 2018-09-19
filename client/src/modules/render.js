import { updateCamera } from './keyboard-controls.js';

const render = (scene, clock, camera, renderer) => {
  // Calculate Delta.
  const delta = clock.getDelta();

  // Update position of camera based on where the player moves to.
  updateCamera(camera);

  // Place the skybox in relation with the camera position.
  scene.children[1].position.set(camera.position.x, camera.position.y, camera.position.z);

  // Update position and state of all npc.
  const npc = dataStore.scene && dataStore.scene.children.filter(child => child.name === 'npcGroup');
  if (npc && npc.length && dataStore.npcStates && dataStore.npcStates.length) {
    npc[0].children.map((child, index) => {
      // Skip npc  if there is no matching state to update for same index.
      const newState = dataStore.npcStates[index];
      if (!newState) return;

      // Update state from dataStore.npcStates when there is one.
      child.userData.state.position =  newState.position;
      child.userData.state.life = newState.life;
      child.userData.state.fightMode = newState.fightMode;

      // Change appearance of npc that are no longer alive.
      if (child.userData.state.life <= 0) {
        child.material.color.set('rgb(50, 50, 50)');
        child.children[0].material.color.set('rgb(200, 200, 200)');
      }

      // Minimum size of any npc is 40.
      const newSize = (child.userData.state.life > 40) ? child.userData.state.life : 40;

      // Update the size of npc based on its life.
      child.scale.set(newSize, newSize, 1.0);

      // Update npc new position.
      child.position.set(
        child.userData.state.position[0],
        child.userData.state.position[1],
        child.userData.state.position[2]
      );
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
