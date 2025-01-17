const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, devConfig);
