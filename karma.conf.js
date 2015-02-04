var webpackConf = require('./webpack.config.js'),
    lodash = require('lodash-node'),
    opts = lodash.cloneDeep(webpackConf);

module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'tests/helpers/**/*.matchers.js',
            'tests/**/*.spec.js'
        ],
        browsers: [
            'Chrome',
            'Firefox'
        ],
        frameworks: [
            'jasmine'
        ],
        port: 9876,
        runnerPort: 9100,
        singleRun: true,
        captureTimeout: 60000,
        reporters: [
            'progress'
        ],
        preprocessors: {
            'src/**/*.js': 'coverage',
            'tests/**/*.spec.js': 'webpack'
        },
        coverageReporter: {
            dir: '.reports/js/coverage/'
        },
        webpack: opts
    });
};
