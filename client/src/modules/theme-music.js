const themeMusic = (camera, url) => {
  // Create an AudioListener and add it to the camera.
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // Create a global audio source.
  const sound = new THREE.Audio(listener);

  // Load a sound and set it as the Audio object's buffer.
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(url, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.35);
    sound.play();
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
