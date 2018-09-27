import { light } from './light.js';
import { skybox } from './skybox.js';
import { keyboardControls } from './keyboard-controls.js';
import { themeMusic } from './theme-music.js';

// Default renderer clear color.
const _color = 0x0e0727;
const _opacity = 1;

// Setup the 3D world.
const world = (input) => {
  const {
    THREE,
    THREEx,
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

  // Create an AudioListener and add it to the camera.
  const listener = new THREE.AudioListener();
  listener.name = 'camera-listener';
  camera.add(listener);

  // Setup keyboard controls.
  const controls = keyboardControls();

  // Setup main theme music.
  const music = themeMusic();

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
  skybox(scene);

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

export { world };
