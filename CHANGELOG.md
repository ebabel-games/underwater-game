# Underwater Game changelog

## 1.5.0
- Before playing, show a splash screen that asks players to give a name. That name will be used in chat instead of the socket id.
- Use the splash screen to start preloading assets and libraries.
- Indicate when the game is ready to play.
- Disable the play button until assets are loaded and game is ready to play.
- Use the splash screen to make sure the sprites are all populated in storeData and in THREE.js scene object.
- Fix the connection event from socket.io not firing sometimes.

## 1.4.0
- Stop sounds when tab is not in focus.
- Stop capturing keyboard keys when the input box gains focus, so the player can type without moving his camera.
- Add sounds for each npc, based on events like when a wisp dies.

## 1.3.0
- Prevent autocomplete in Chrome for the chat input field.
- Remove Orbit Controls and replace with keyboard controls.
- Implement fighting between npc.
- Add text above each npc sprite.
- Fix linting issues.
- Increase distance at which sprites start fighting.
- Skybox follows position of the camera so that user is always at its center to preserve the illusion of distant 3D environment.

## 1.2.0
- Setup server-side game loop.
- Add non-player-characters (npc). Spawn npc based on spawn chance. The game doesn't take any order, this isn't an API anymore.

## 1.1.1
- Fix the deployment to DigitalOcean Ubuntu/Node.js droplet.

## 1.1.0
- Create 3D world.
- Setup testing and linting.
- Setup build and production builds.
- Improve skybox with actual textures.
- Remove fog and ground.

## 1.0.0
- Multi-player chat.

# Future features to develop
- Keep adding spawns regardless of max/min population. Let the fighting and the dead sprites make room for new sprites.
- Fix the blinking of sprites and make their movement smoother.
- Fix some sprites that are not fighting, not dead but not moving either.
- Keep running the node.js instance "forever" to persist the world, its non-player-characters (npc) and player characters (pc).
