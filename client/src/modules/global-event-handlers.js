'strict';

// Register global event handlers (only run once).
const globalEventHandlers = () => {
  window.addEventListener('adjustMasterVolume', (e) => {
    const masterVolume = e.detail.masterVolume;
    const cameraListeners = dataStore.camera.children.filter(c => c.type === 'AudioListener');
    if (cameraListeners && cameraListeners.length)
      cameraListeners.map((listener) => listener.setMasterVolume(masterVolume));
  });

  window.addEventListener('blur', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: 0 } }));
  });

  window.addEventListener('focus', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: dataStore.defaultVolume } }));
  });

  document.getElementById('logsInput').addEventListener('focus', () => {
    dataStore.disablePlayerControls = true;
  });

  document.getElementById('logsInput').addEventListener('blur', () => {
    dataStore.disablePlayerControls = false;
  });
};

module.exports = globalEventHandlers;
