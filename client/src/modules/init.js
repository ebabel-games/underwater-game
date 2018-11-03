'strict';

const spawnSprite = require('./spawn-sprite');
const playSoundEffect = require('./play-sound-effect');

// Particles setup.
const particleTexture = new THREE.TextureLoader().load('assets/spark.png');
const particleGroup = new THREE.Object3D();
particleGroup.name = 'npc-group';

const addNpc = (sprite) => {
  particleGroup.add(sprite);
  EG.scene.add(particleGroup);
};

const init = () => {
  // Spawn multiple npc.
  socket.on('spawnMultipleNpc', (multipleNpc) => {
    multipleNpc.map((npc) => {
      addNpc(spawnSprite({ spriteData: npc, particleTexture }));
    });
  });

  // Spawn single npc.
  socket.on('spawnSprite', (npc) => {
    addNpc(spawnSprite({ spriteData: npc, particleTexture }));
  });

  // Update npc states.
  socket.on('updateNpcStates', (npcStates) => {
    EG.dataStore.npcStates = npcStates;
  });

  // Spawn current player.
  socket.on('spawnPlayer', (player) => {
    EG.dataStore.player = player;
    EG.scene.add(spawnSprite({ spriteData: player, particleTexture }));
  });

  //  Spawn other player state that spawns after the current player.
  socket.on('addOtherPlayer', (otherPlayerState) => {
    EG.dataStore.otherPlayerStates[otherPlayerState.name] = otherPlayerState;
    EG.scene.add(spawnSprite({ spriteData: otherPlayerState, particleTexture }));
  });

  // Update position of a player other than current one.
  socket.on('updateOtherPlayerPosition', (playerState) => {
    EG.dataStore.otherPlayerStates[playerState.name].position = playerState.position;
  });

  // Update life of players, only from server to all clients
  // because the single source of truth for life is on the server-side.
  socket.on('updatePlayerLife', (playerState) => {
    if (EG.dataStore.player.name === playerState.name) {
      // Update current player.
      EG.dataStore.player.life = playerState.life;

      document.getElementById('playerLife').textContent = playerState.life;

      // Update life of current player in scene.
      EG.scene.children.filter(player => player.name === playerState.name)[0].userData.life = playerState.life;
    }
    
    if (EG.dataStore.player.name !== playerState.name) {
      // Update other player.
      EG.dataStore.otherPlayerStates[playerState.name].life = playerState.life;

      // Check if the other player is already in EG.scene.
      const otherPlayer = EG.scene.children.filter(otherPlayer => otherPlayer.name === playerState.name);

      // If the other player is in scene, update the life.
      if (otherPlayer.length === 1) {
        otherPlayer[0].userData.life = playerState.life;
      }
    }
  });

  socket.on('action', (action) => {
    // Play all sound effects when the Player is the agent.
    if (action.agentType === 'Player') {
      playSoundEffect(action.agentName, action.name);
    }

    // Only a blessed wisp can heal, but the player is the target.
    if (action.targetType === 'Player' && action.name === 'heals') {
      playSoundEffect(action.targetName, action.name);
    }

    // Note: not all possible sound effects are played, in particular the npc sound effects, because their name is not unique and there would be too many sound effects competing to play at the same time.
  });

  socket.on('playerDied', (name) => {
    playSoundEffect(name, 'death');
  });

  socket.on('removePlayer', (name) => {
    // Remove other player from EG.dataStore.
    EG.dataStore.otherPlayerStates[name] = undefined;
    delete EG.dataStore.otherPlayerStates[name];

    // Remove other player from THREE.js scene.
    EG.scene.remove(EG.scene.getObjectByName(name));
  });

  socket.on('updatePlayerFightMode', (playerState) => {
    if (playerState.name ===  EG.dataStore.player.name && playerState.fightMode) {
      EG.dataStore.player.fightMode = true;
      const sounds = EG.scene.children.filter(c => c.type === 'Audio');
      sounds.map((s) => {
        if (s.name === 'default-theme') s.pause();
        if (s.name === 'combat-theme') s.play();
      });
    }

    if (playerState.name ===  EG.dataStore.player.name && !playerState.fightMode) {
      EG.dataStore.player.fightMode = false;
      const sounds = EG.scene.children.filter(c => c.type === 'Audio');
      sounds.map((s) => {
        if (s.name === 'default-theme') s.play();
        if (s.name === 'combat-theme') s.pause();
      });
    }
  });

  socket.on('playerCreated', (input = {}) => {
    const {
      name,
      players
    } = input;

    document.getElementById('playerName').textContent = name;
    document.getElementById('playerLife').textContent = players[name].life;
  
    EG.dataStore.player.name = name;
    document.getElementById('splashScreen').style.display = 'none';
  
    Object.keys(players).map((_name) => {
      if (_name !== name) {
        EG.dataStore.otherPlayerStates[_name] = players[_name];
        EG.scene.add(spawnSprite({ spriteData: players[_name], particleTexture }));
      }
    });
  });
  
  socket.on('nameNotAvailable', (name) => {
    document.getElementById('loginForm').classList.toggle('error', true);
  });  
};

module.exports = init;
