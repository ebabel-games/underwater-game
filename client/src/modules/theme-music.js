const themeMusic = (input) => {
  const {
    camera,
    url = 'assets/music/ambient2-nautilus.mp3',
    loop = true,
    volume = 0.35,
    autostart = true
  } = input;

  if (!camera) return;

  // Create an AudioListener and add it to the camera.
  const listener = new THREE.AudioListener();
  listener.name = 'camera-listener';
  camera.add(listener);

  // Create a global audio source.
  const sound = new THREE.Audio(listener);

  // Load a sound and set it as the Audio object's buffer.
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(url, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(loop);
    sound.setVolume(volume);
    if (autostart) sound.play();
  });

  return {
    camera,
    url,
    listener,
    sound,
    audioLoader
  }
};

export { themeMusic };
