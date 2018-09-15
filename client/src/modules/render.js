const render = (socket, dataStore, scene, clock, camera, renderer) => {
  const delta = clock.getDelta(); // Calculate Delta.

  // Animate npc.
  const npc = scene.children.filter(child => child.name === 'npc');
  if (npc && npc.length > 0 && npc[0].children && npc[0].children.length > 0) {
    npc[0].children.map(n => {
      if (n.userData.state.name === 'a blessed wisp') {
        console.log(n.userData.state.position);
        // todo: update the position of all npc in one go, from a socket.io event emitted from server-side.
      }
    });
  }

  // Render the scene.
  renderer.render(scene, camera);
  requestAnimationFrame((timestamp) => {
    render(socket, dataStore, scene, clock, camera, renderer);
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
