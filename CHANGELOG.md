# Underwater Game changelog

## 1.14.0
- Refactor code into separate modules in ebabel.
  - light
  - skybox
- Dynamically centre the text of each sprite.
- Player vs npc fighting.

## 1.13.0
- Refactor code into separate, reusable modules.

## 1.12.0
- Only broadcast name, position, rotation, life, color, attack, defense, and fightMode to other players.
- If the player moved, broadcast to all other players her new position.
- For the current player, spawn all previously existing players in game.
- For previously logged players, the new players also need to appear even if they don't move.

## 1.11.0
- Message all players when a player disconnects.
- Sharpen the text labels attached to sprites.
- Center the text names above "a wisp".
- Prevent a player from joining with a name that is currently taken.
- Remove from all clients a player that has disconnected.

## 1.10.2
- Add support for Google Analytics.

## 1.10.1
- Add script to stop forever before it starts again.

## 1.10.0
- Display a sprite for each player and attach name of player above the sprite as text.

## 1.9.3
- Add [browser support](BROWSER_SUPPORT.md) documentation.

## 1.9.2
- Update package.json test file pattern

## 1.9.1
- Fix the `forever` process, so that game doesn't crash when ssh console is closed.

## 1.9.0
- Fix the blessed wisps attacking other wisps.
- Disable play button, display loading animation, and once the game is ready, remove loading animation, and enable the play button.

## 1.8.0
- Remove messages to chat when a sprite dies, because that's too much spam.
- When npc respawns, he reappears at a random location.
- When defence npc dies, the attack npc gets his all his default creation life back, and a random bonus. However, if the bonus would be less than the npc currently has in life, then he keeps that same state life.

## 1.7.0
- Put back maximum population, to preserve performance.
- Resurrect dead npc when they reach a certain height, and place them back at their initial creation location.

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
- Player vs npc fighting.
- Player vs player fighting.
- Improve time to interactive by optimizing images format. See Chrome Audit.
- Fix the blinking of sprites and make their movement smoother.
- Fix some sprites that are not fighting, not dead but not moving either.
- Fix the label above each sprite rotating based on camera instead of facing straight to camera regardless of angle.
- Camera of player looking up and down in a way that feels natural would be a nice addon.
- Add reporting for test coverage.
- Write more tests.
- Document performance targets into PERFORMANCE.md
- Improve configuration of `forever` to fix 2 warnings: `--minUptime not set. Defaulting to: 1000ms` and `--spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms`
- Implement the module Ernesto is developing, to place particles around the environment without impacting server side socket communication load.
- Spawn npc in random positions near players instead of spawning anywhere in the large space. When npc die, also respawn them in random positions near players. Reduce the number of npc: instead of 99 npc, have just a few per player. This should improve performance overall.
- Monitor custom events (player starts, name, player disconnects) with Google Analytics.
- Persist data to a database, so that despite rebooting the game, the universe can be restored to a previous state and feel more persistent. Take frequent snapshots but not every single state change, overwise that will be too much data. There is no need to log old data, only keep the latest state.
- Login with Firebase.
- Store logs and usage in Firebase.
- Persist state of game in Firebase.
- Build a downloadable version of the game that can be run as a desktop app with [Electron](https://electronjs.org/) - see [sample project](https://github.com/jeromeetienne/electron-threejs-example)
- Publish the game on the Steam store.
- Publish also on the [Mac](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide) and [Windows](https://electronjs.org/docs/tutorial/windows-store-guide) stores.
- Fix text labels that are black instead of white on Safari 12 (Mac desktop).
- Create re-usable npm packages for the ebabel library to make multiple games from the code in this game, and use these modules in this game.
