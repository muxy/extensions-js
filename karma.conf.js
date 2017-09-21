const webpackConfig = require('./webpack.config.js');

module.exports = function karma(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['mocha'],

    port: 52987, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless_NoSandbox'],
    autoWatch: false,
    singleRun: true, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,

    files: ['spec/**/*.spec.js'],

    preprocessors: {
      './spec/**/*.spec.js': ['webpack']
    },

    customLaunchers: {
      ChromeHeadless_NoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
        displayName: 'Chrome Headless w/o Sandbox'
      }
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    mochaReporter: {
      showDiff: true
    }
  });
};
