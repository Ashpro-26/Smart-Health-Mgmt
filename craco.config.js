const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer/'),
          util: require.resolve('util/'),
          process: require.resolve('process/browser.js'),
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          vm: false,
          fs: false,
          net: false,
          tls: false
        }
      };

      // Add plugins
      webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer']
        })
      ];

      return webpackConfig;
    }
  },
  devServer: {
    webSocketServer: 'ws',
    client: {
      webSocketURL: 'ws://localhost:3001/ws',
      overlay: false, // Disables the error overlay which can sometimes interfere with WebSockets
    },
  },
  babel: {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime'
    ]
  }
}; 