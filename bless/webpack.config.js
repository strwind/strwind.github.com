var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var Clean = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: false,
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

module.exports = {
  entry: ['babel-polyfill','./src/js/Main.js'],
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules\/(?!(stardust))/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            plugins: [
              'transform-runtime',
              'add-module-exports',
              'transform-decorators-legacy',
            ],
            presets: ['es2015', 'react', 'stage-1'],
          }
        }
    ],
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  },
  watch: false,
  plugins: [
    new Clean(['dist', 'build']),
    new webpack.ProvidePlugin({
      $: 'zepto',
      Zepto: 'zepto',
      'window.Zepto': 'zepto'
    }),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/lib/',
        to: __dirname + '/build/',
        ignore: "*.css"
    }]),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/img/',
        to: __dirname + '/build/img/'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: false
    }),
    definePlugin
  ],
}