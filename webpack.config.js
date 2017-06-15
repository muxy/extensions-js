const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|\.spec\.js$)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  externals: {
    /*lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    },
    'xhr-promise': {
      commonjs: 'xhr-promise',
      commonjs2: 'xhr-promise',
      amd: 'xhr-promise'
    }*/
  },

  output: {
    library: 'MuxyExtensionsSDK',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'muxy-extensions-sdk.js'
  }
};
