'strict';

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

  // Update position of a player other than current one.
  socket.on('updateOtherPlayerPosition', (playerState) => {
    dataStore.otherPlayerStates[playerState.name].position = playerState.position;
  });

  // Update life of players, only from server to all clients
  // because the single source of truth for life is on the server-side.
  socket.on('updatePlayerLife', (playerState) => {
    if (dataStore.player.name === playerState.name) {
      // Update current player.
      dataStore.player.life = playerState.life;

      // Update life of current player in scene.
      dataStore.scene.children.filter(player => player.name === playerState.name)[0].userData.life = playerState.life;
    }
    
    if (dataStore.player.name !== playerState.name) {
      // Update other player.
      dataStore.otherPlayerStates[playerState.name].life = playerState.life;

      // Check if the other player is already in dataStore.scene.
      const otherPlayer = dataStore.scene.children.filter(otherPlayer => otherPlayer.name === playerState.name);

      // If the other player is in scene, update the life.
      if (otherPlayer.length === 1) {
        otherPlayer[0].userData.life = playerState.life;
      }
    }
  });

  socket.on('removePlayer', (name) => {
    // Remove other player from dataStore.
    dataStore.otherPlayerStates[name] = undefined;
    delete dataStore.otherPlayerStates[name];

    // Remove other player from THREE.js scene.
    dataStore.scene.remove(dataStore.scene.getObjectByName(name));
  });

  socket.on('updatePlayerFightMode', (playerState) => {
    if (playerState.name ===  dataStore.player.name && playerState.fightMode) {
      dataStore.player.fightMode = true;
      const audio = dataStore.scene.children.filter(c => c.type === 'Audio');
      audio.map((a) => {
        if (a.name === 'default-theme') a.pause();
        if (a.name === 'combat-theme') a.play();
      });
    }

    if (playerState.name ===  dataStore.player.name && !playerState.fightMode) {
      dataStore.player.fightMode = false;
      const audio = dataStore.scene.children.filter(c => c.type === 'Audio');
      audio.map((a) => {
        if (a.name === 'default-theme') a.play();
        if (a.name === 'combat-theme') a.pause();
      });
    }
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
