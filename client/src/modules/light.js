// Light.
const light = (input) => {
  const {
    THREE,
    scene,
    color = 0xffffff,
    position = [0, 250, 0],
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
