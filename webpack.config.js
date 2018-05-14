const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const formatter = require('eslint-friendly-formatter');

const port = process.env.PORT || 9000;

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    'muxy-extensions': './src/index.ts',
    'muxy-extensions.min': './src/index.ts'
  },

  target: 'web',

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: { formatter }
      },
      {
        test: /(\.js$|\.ts(x?)$)/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  node: false,

  output: {
    library: 'Muxy',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],

  externals: ['sinon'],

  devServer: {
    port,
    https: {
      key: fs.readFileSync('./certs/testing.key'),
      cert: fs.readFileSync('./certs/testing.crt')
    }
  }
};
