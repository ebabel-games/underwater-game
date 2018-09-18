let moveForward;
let moveBackward;
let turnLeft;
let turnRight;
let moveUp;

const moveSpeed = 10;
const turnSpeed = 2;

const updateCamera = (camera) => {
  if (moveForward) {
    camera.translateZ(-moveSpeed);
  }

  if (moveBackward) {
    camera.translateY(-moveSpeed / 3);
  }

  if (turnLeft) {
    camera.rotation.y += turnSpeed * Math.PI / 180;
  }

  if (turnRight) {
    camera.rotation.y -= turnSpeed * Math.PI / 180;
  }

  if (moveUp) {
    camera.translateY(moveSpeed / 2);
  }
};

const keyboardControls = () => {
  const setDirection = (input) => {
    const event = input && input.event;
    const keyCode = input && input.keyCode;
    const enable = input && input.enable;

    switch (keyCode) {
      case 38: // Up arrow.
      case 87: // W
        moveForward = enable;
        break;

      case 40: // Down arrow.
      case 83: // S
        moveBackward = enable;
        event.preventDefault(); // Prevent the whole page scrolling down when using the down arrow key.
        break;

      case 37: // Left arrow.
      case 65: // A
        turnLeft = enable;
        break;

      case 39: // Right arrow.
      case 68: // D
        turnRight = enable;
        break;

      case 32: // Space bar.
        moveUp = enable;
        break;
    }
  }

  const onKeyDown = (e) => {
    setDirection({
      event: e,
      keyCode: e.keyCode,
      enable: true
    });
  };

  const onKeyUp = (e) => {
    setDirection({
      event: e,
      keyCode: e.keyCode,
      enable: false
    });
  };

  document.addEventListener('keydown', onKeyDown.bind(this), false);
  document.addEventListener('keyup', onKeyUp.bind(this), false);
};

export { keyboardControls, updateCamera };
