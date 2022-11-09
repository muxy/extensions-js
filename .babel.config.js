module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    'add-module-exports',
    {
      addDefaultProperty: true
    },
    'transform-runtime'
  ],
  comments: false
};
