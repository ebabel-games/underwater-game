const themeMusic = (input = {}) => {
  const {
    src = [
      'assets/music/ambient2-nautilus.wma',
      'assets/music/ambient2-nautilus.mp3'
    ],
    loop = true,
    volume = dataStore.defaultVolume,
    autoplay = true
  } = input;

  const music = new Howl({
    src,
    autoplay,
    loop,
    volume,
    onend: () => dataStore.themeMusicLoaded = true
  });

  return music;
};

export { themeMusic };
