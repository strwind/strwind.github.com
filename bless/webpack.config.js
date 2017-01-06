var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var Clean = require('clean-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: false,
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: '.tmp/'
        },
        exclude: 'node_modules/'
      }
    ]
  },
  watch: true,
  plugins: [
    new Clean(['dist', 'build']),
    new webpack.ProvidePlugin({
      $: 'zepto',
      Zepto: 'zepto',
      'window.Zepto': 'zepto'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: false
    }),
    definePlugin
  ],
}