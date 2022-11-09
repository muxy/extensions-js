module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },

  extends: ['plugin:prettier/recommended'],

  plugins: ['prettier'],

  env: {
    browser: true,
    node: true
  },

  rules: {
    // No console or debugger lines in production. Warn in dev, to make it
    // easier to identify them.
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,

    // ES6 let and const don't hoist variables, so it is an error to use them
    // before they are defined. However, without a good function definition/declaration
    // distinction trying to get definition order correct is ugly at best.
    'no-use-before-define': ['error', { functions: false }],

    // Don't allow trailing commas (e.g. ['a',]).
    'comma-dangle': ['error', 'never'],

    // Enforce use of === for comparisons.
    eqeqeq: 'error',

    // Keep spacing around function parens consistent.
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // Don't allow reassigning function paramaters.
    'no-param-reassign': 'error',

    // Allow omitting parens when there is only one argument to an arrow function.
    'arrow-parens': ['error', 'as-needed'],

    // Require all immediately-invoked function expressions to be outside parentheses.
    'wrap-iife': ['error', 'inside'],

    // util.js has a wrapper class around some deprecated functions named the same.
    // Once those have been removed we can turn this error back on.
    'import/no-named-as-default-member': 'off',

    // We don't actually use JSX, but airbnb does. And there is a bug with
    // this option in the current eslint/npm versions.
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true
      }
    ]
  },

  overrides: [
    {
      files: ['__tests__/**/*.ts'],
      rules: {
        'no-console': 'off',
        'max-len': 'off'
      }
    }
  ]
};
