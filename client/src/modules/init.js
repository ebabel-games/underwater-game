const spawnSprite = require('./spawn-sprite');

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc-group';

const addNpc = (sprite) => {
  particleGroup.add(sprite);
  dataStore.scene.add(particleGroup);
};

const init = (camera) => {
  // Spawn multiple npc.
  socket.on('spawnMultipleNpc', (multipleNpc) => {
    multipleNpc.map((npc) => {
      addNpc(spawnSprite({ spriteData: npc, particleTexture, camera }));
    });
  });

  // Spawn single npc.
  socket.on('spawnSprite', (npc) => {
    addNpc(spawnSprite({ spriteData: npc, particleTexture, camera }));
  });

  // Update npc states.
  socket.on('updateNpcStates', (npcStates) => {
    dataStore.npcStates = npcStates;
  });

  // Spawn current player.
  socket.on('spawnPlayer', (player) => {
    dataStore.player = player;
    dataStore.scene.add(spawnSprite({ spriteData: player, particleTexture, camera }));
  });

  //  Spawn other player state that spawns after the current player.
  socket.on('addOtherPlayer', (otherPlayerState) => {
    dataStore.otherPlayerStates[otherPlayerState.name] = otherPlayerState;
    dataStore.scene.add(spawnSprite({ spriteData: otherPlayerState, particleTexture, camera }));
  });

  // Update state of a player other than current one.
  socket.on('updateOtherPlayerStates', (playerState) => {
    dataStore.otherPlayerStates[playerState.name] = playerState;

    // If that player state isn't in the scene of current player, add that other player now.
    const otherPlayerExists = dataStore.scene.children.filter(otherPlayer => otherPlayer.name === playerState.name).length;
    if (!otherPlayerExists) {
      // Note: this other player had already spawned before the current one started playing.
      dataStore.scene.add(spawnSprite({ spriteData: playerState, particleTexture, camera }));
    }
  });

  socket.on('removePlayer', (name) => {
    // Remove other player from dataStore.
    dataStore.otherPlayerStates[name] = undefined;
    delete dataStore.otherPlayerStates[name];

    // Remove other player from THREE.js scene.
    dataStore.scene.remove(dataStore.scene.getObjectByName(name));
  });

  socket.on('playerCreated', (input = {}) => {
    const {
      name,
      players
    } = input;
  
    dataStore.player.name = name;
    document.getElementById('splashScreen').style.display = 'none';
  
    Object.keys(players).map((_name) => {
      if (_name !== name) {
        dataStore.otherPlayerStates[_name] = players[_name];
        dataStore.scene.add(spawnSprite({ spriteData: players[_name], particleTexture, camera }));
      }
    });
  });
  
  socket.on('nameNotAvailable', (name) => {
    document.getElementById('loginForm').classList.toggle('error', true);
  });  
};

module.exports = init;
