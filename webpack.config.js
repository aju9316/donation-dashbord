var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    inline: true,
    contentBase: './build',
    port: 3000
  },
  context: path.resolve(__dirname, './'),
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: ['react','es2015']
          }
        }]
      }
    ],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};