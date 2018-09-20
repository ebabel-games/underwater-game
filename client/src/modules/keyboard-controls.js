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
        moveForward = enable;
        break;

      case 40: // Down arrow.
        moveBackward = enable;
        break;

      case 37: // Left arrow.
        turnLeft = enable;
        break;

      case 39: // Right arrow.
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
