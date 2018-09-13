# Underwater Game changelog

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
- Add non-player-characters (npc). Spawn npc based on spawn chance. The game doesn't take any order, this isn't an API anymore.
- Implement fighting between npc
- Skybox follows position of the camera so that user is always at its center to preserve the illusion of distant 3D environment.
- Keep running the node.js instance "forever" to persist the world, its non-player-characters (npc) and player characters (pc).
