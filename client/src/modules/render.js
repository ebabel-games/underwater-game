const render = (scene, clock, camera, renderer) => {
  const delta = clock.getDelta(); // Calculate Delta.

  // Animate npc.
  const npc = dataStore.scene && dataStore.scene.children.filter(child => child.name === 'npc');
  if (npc && npc.length && dataStore.npcPositions && dataStore.npcPositions.length) {
    npc[0].children.map((child, index) => {
      // Skip npc  if there is no matching position to update for same index.
      if (!dataStore.npcPositions[index]) {
        return;
      }

      // Only npc with positive life points are visible.
      if (child.userData.state.life < 0) {
        child.visible = false;
        return;
      }

      // Update the size of npc based on its life.
      child.scale.set(child.userData.state.life * 20, child.userData.state.life * 20, 1.0);

      // Skip npc movement if fight mode is on.
      if (child.userData.state.fightMode) {
        return;
      }

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
