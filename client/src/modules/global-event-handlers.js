'use strict';

// Register global event handlers (only run once).
const globalEventHandlers = () => {
  window.addEventListener('adjustMasterVolume', (e) => {
    const masterVolume = e.detail.masterVolume;
    const cameraListeners = EG.camera.children.filter(c => c.type === 'AudioListener');
    if (cameraListeners && cameraListeners.length)
      cameraListeners.map((listener) => listener.setMasterVolume(masterVolume));
  });

  window.addEventListener('blur', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: 0 } }));
  });

  window.addEventListener('focus', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: EG.dataStore.defaultVolume } }));
  });

  document.getElementById('logsInput').addEventListener('focus', () => {
    EG.dataStore.disablePlayerControls = true;
  });

  document.getElementById('logsInput').addEventListener('blur', () => {
    EG.dataStore.disablePlayerControls = false;
  });
};

module.exports = globalEventHandlers;
