// Register global event handlers (only run once).
const globalEventHandlers = () => {
  window.addEventListener('adjustMasterVolume', (e) => Howler.volume(e.detail.masterVolume));

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

export { globalEventHandlers };
