// Register global event handlers (only run once).
const globalEventHandlers = () => {
  window.addEventListener('adjustMasterVolume', (e) => {
    const masterVolume = e.detail.masterVolume;
    const cameraListener = dataStore.camera.children.filter(c => c.name === 'camera-listener');
    if (cameraListener && cameraListener[0])
      cameraListener[0].setMasterVolume(masterVolume);
  });

  window.addEventListener('blur', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: 0 } }));
  });

  window.addEventListener('focus', () => {
    window.dispatchEvent(new CustomEvent('adjustMasterVolume', { detail: { masterVolume: 1 } }));
  });

  document.getElementById('logsInput').addEventListener('focus', () => {
    dataStore.disablePlayerControls = true;
  });

  document.getElementById('logsInput').addEventListener('blur', () => {
    dataStore.disablePlayerControls = false;
  });
};

export { globalEventHandlers };
