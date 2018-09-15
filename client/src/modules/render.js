const render = (socket, scene, clock, camera, renderer) => {
  const delta = clock.getDelta(); // Calculate Delta.

  // Animate npc.
  const npc = dataStore.scene && dataStore.scene.children.filter(child => child.name === 'npc');
  if (npc && npc.length && dataStore.npcPositions && dataStore.npcPositions.length) {
    npc[0].children.map((child, index) => {
      if (!dataStore.npcPositions[index]) {
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
    render(socket, scene, clock, camera, renderer);
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
