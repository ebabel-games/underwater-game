// Light.
const light = (scene, color = 0xffffff, position = [0, 250, 0]) => {
  const mainLight = new THREE.PointLight(color);
  mainLight.name = 'main-light';
  mainLight.position.set(
    position[0],
    position[1],
    position[2]
  );
  scene.add(mainLight);

  return mainLight;
};

export { light };
