const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/src/game.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'game.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  watchOptions: {
    ignored: /node_modules/
  }
};
