const forever = require('forever-monitor');

const child = new (forever.Monitor)('./server/index.js', {
  max: 3,
  silent: true,
  args: []
});

child.on('exit', () => {
  console.log('index.js has exited after 3 restarts');  /* eslint no-console: 0 */
});

child.start();
