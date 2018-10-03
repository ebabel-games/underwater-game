const { light, skybox, keyboardControls } = require('ebabel');

const { themeMusic } = require('./theme-music');

// Default renderer clear color.
const _color = 0x0e0727;
const _opacity = 1;

// Setup the 3D world.
const world = (input) => {
  const {
    THREE,
    THREEx,
    dataStore,
    color = _color,
    opacity = _opacity
  } = input;

  // Setup main clock that accurately calculates delta in animations.
  const clock = new THREE.Clock();
  clock.start();

  // Setup main 3D scene where all meshes, sprites, and 3D objects will live.
  const scene = new THREE.Scene();
  scene.name = 'underwater-game-world';

  // Setup camera as the subjective first person point of view of current player.
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
  camera.name = 'player-first-view-camera';
  camera.position.set(...dataStore.player.state.position);
  camera.rotation.set(...dataStore.player.state.rotation);

  // Setup keyboard controls.
  const controls = keyboardControls(dataStore);

  // Setup main theme music.
  const music = themeMusic({ THREE, camera, volume: dataStore.defaultVolume });

  // Setup main renderer for WebGL graphics.
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(color, opacity);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // When the window resizes, adjust the renderer and camera.
  const windowResize = new THREEx.WindowResize(renderer, camera);

  // Light.
  light({ THREE, scene });

  // Skybox.
  skybox({
    THREE,
    scene,
    directions:  ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
      .map((direction) => `../assets/whirlpool/large-files/whirlpool_${direction}.jpg`)
  });

  return {
    clock,
    scene,
    camera,
    renderer,
    controls,
    windowResize,
    music
  };
};

module.exports = {
  world,
};
