import { light } from './light.js';
import { skybox } from './skybox.js';

// Default camera position.
const _position = [
  -151.16242594559424,
  42.748204539201545,
  218.00346784149542
];

// Default camera rotation.
const _rotation = [
  -0.19363271143730437,
  -0.5974748869523452,
  -0.10986727175133501
];

// Default renderer clear color.
const _color = 0x0e0727;
const _opacity = 1;

// Setup the 3D world.
const world = (THREE, THREEx, position = _position, rotation = _rotation, color = _color, opacity = _opacity) => {
  const clock = new THREE.Clock();
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.01, 200000);
  camera.position.set(position[0], position[1], position[2]);
  camera.rotation.set(rotation[0], rotation[1], rotation[2]);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(color, opacity);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Let user rotate around the world with touch or mouse.
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

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
