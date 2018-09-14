// Skybox.
// Note: skybox works better for alpha blending with sprite images.
const skybox = (scene) => {
  const geometry = new THREE.BoxBufferGeometry(10000, 10000, 10000);

  const directions = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
    .map(filename => `../assets/whirlpool/whirlpool_${filename}.jpg`);;

  const material = directions.map(direction => new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(direction),
    side: THREE.BackSide
  }));

  const model = new THREE.Mesh(geometry, material);
  model.name = 'skybox';
  scene.add(model);

  return model;
};

export { skybox };
