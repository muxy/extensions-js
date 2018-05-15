const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 9000;

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',

  entry: {
    'muxy-extensions': './src/index.ts',
    'muxy-extensions.min': './src/index.ts'
  },

  target: 'web',

  module: {
    rules: [{
        test: /\.ts(x?)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configuration: {
            rules: {
              quotemark: [true, 'double']
            }
          },

          emitErrors: true,
          failOnHint: true,
          typeCheck: false,
          fix: false
        }
      },
      {
        test: /(\.js$|\.ts(x?)$)/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader'
        }]
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
