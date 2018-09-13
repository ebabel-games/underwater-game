const world = (THREE, THREEx) => {
  // THREE.js setup.
  const clock = new THREE.Clock();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 20000);
  camera.position.set(87, 25, 253);
  camera.rotation.set(-0.098, 0.33, 0.031);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#0e0727");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  const windowResize = new THREEx.WindowResize(renderer, camera);

  // Light.
  const light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  scene.add(light);

  // Ground.
  const floorTexture = new THREE.TextureLoader().load('../assets/soil-beach.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
  floorTexture.repeat.set(100, 100);
  const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
  const floorGeometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -50;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  // Skybox.
  // Note: skybox works better for alpha blending with sprite images.
  const skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x3c6478, side: THREE.BackSide });
  const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);

  // Underwater "fog".
  const fog = new THREE.FogExp2(0x3c6478, 0.0005);
  scene.fog = fog;

  return {
    clock,
    scene,
    controls,
    windowResize,
    camera,
    renderer
  };
};

export { world };
