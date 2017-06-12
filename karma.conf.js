const webpackConfig = require('./webpack.config.js');

module.exports = (config) => {
  process.env.BABEL_ENV = 'karma';

  config.set({
    frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],
    browsers: ['ChromeHeadless_NoSandbox'],
    customLaunchers: {
      ChromeHeadless_NoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    files: ['./spec/*.spec.js'],

    // Preprocess through webpack
    preprocessors: {
      './spec/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    singleRun: true,

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov' }
      ]
    }
  });
};
