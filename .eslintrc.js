module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module'
  },

  extends: 'airbnb',

  env: {
    browser: true,
    node: true
  },

  settings: {
    ecmascript: 6,
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': [2, {
      'props': false
    }]
  }
}
