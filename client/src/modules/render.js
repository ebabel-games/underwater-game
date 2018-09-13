const render = (scene, clock, camera, renderer) => {
  const delta = clock.getDelta(); // Calculate Delta.

  // todo: animations are placed here. Use delta to keep speeds consistent.

  // Render the scene.
  renderer.render(scene, camera);
  requestAnimationFrame((timestamp) => {
    render(scene, clock, camera, renderer);
  });
};

export { render };
