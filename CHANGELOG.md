# Underwater Game changelog

## 1.7.0
- Remove dead npc when they reach a certain height, to preserve performance.

## 1.6.1
- Fix typo in package.json

## 1.6.0
- Keep running the node.js instance "forever" to persist the world, its non-player-characters (npc) and player characters (pc).
- Keep adding spawns regardless of maximum population. Let the fighting and the dead sprites make room for new sprites.

## 1.5.0
- Before playing, show a splash screen that asks players to give a name.
- That name will be used in chat instead of the socket id.
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
- Display a sprite for each player and attach name of player above the sprite as text
- Let player fight npc
- Fix the blinking of sprites and make their movement smoother.
- Fix some sprites that are not fighting, not dead but not moving either.
- Fix the label above each sprite rotating based on camera instead of facing straight to camera regardless of angle.
- Camera of player looking up and down in a way that feels natural would be a nice addon.
