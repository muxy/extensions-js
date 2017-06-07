const path = require('path');


module.exports = (config) => {
    process.env.BABEL_ENV = 'karma';

    config.set({
        frameworks: ['mocha', 'chai', 'sinon'],
        browsers: ['PhantomJS'],
        files: [
            './spec/*.spec.js'
        ],

        // Preprocess through webpack
        preprocessors: {
            "./spec/*.spec.js": ["webpack"]
        },
        webpack: require("./webpack.config.js"),
        webpackMiddleware: {
            stats: "errors-only"
        },
        singleRun: true,

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [
                { type: 'html' },
                { type: 'lcov' },
            ],
        }
    });
};