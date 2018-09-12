const path = require('path');

module.exports = {
  entry: './client/src/game.js',
  output: {
    filename: 'game.min.js',
    path: path.resolve(__dirname, 'client/dist')
  }
};
