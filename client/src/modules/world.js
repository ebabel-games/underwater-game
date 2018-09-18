import { light } from './light.js';
import { skybox } from './skybox.js';
import { keyboardControls } from './keyboard-controls.js';

const playerBindPoint = {
  position: [
    -0.009062170340834919,
    0.001421878159226919,
    0.014692015900277543
  ],
  rotation: [
    -0.09647850685417493,
    -0.5506070394039728,
    -0.05059199825215861
  ]
}

// Default renderer clear color.
const _color = 0x0e0727;
const _opacity = 1;

// Setup the 3D world.
const world = function (input) {
  const {
    THREE,
    THREEx,
    position = playerBindPoint.position,
    rotation = playerBindPoint.rotation,
    color = _color,
    opacity = _opacity
  } = input;

  const clock = new THREE.Clock();
  clock.start();

  const scene = new THREE.Scene();
  scene.name = 'underwater-game-world';

  // Setup camera as the subjective first person point of view of current player.
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
  camera.position.set(position[0], position[1], position[2]);
  camera.rotation.set(rotation[0], rotation[1], rotation[2]);

  // Setup keyboard controls.
  const controls = keyboardControls();

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
    windowResize
  };
};

export { world };
