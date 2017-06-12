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
    'no-console': 2,
    'no-debugger': 2,
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'always']
    'no-param-reassign': [2, {
      'props': false
    }]
  }
}
