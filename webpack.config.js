const fs = require('fs');
const path = require('path');
const formatter = require('eslint-friendly-formatter');

const port = process.env.PORT || 9000;

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  output: {
    library: 'Muxy',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'muxy-extensions-sdk.js'
  },

  devServer: {
    port,
    https: {
      key: fs.readFileSync('./certs/testing.key'),
      cert: fs.readFileSync('./certs/testing.crt')
    }
  }
};
