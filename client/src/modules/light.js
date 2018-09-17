// Light.
const light = (input) => {
  const {
    THREE,
    scene,
    color = 0xffffff,
    position = [1, 250, 1],
    name = 'main-light'
  } = input;

  const mainLight = new THREE.PointLight(color);
  mainLight.name = name;
  mainLight.position.set(
    position[0],
    position[1],
    position[2]
  );
  scene.add(mainLight);

  return mainLight;
};

export { light };
