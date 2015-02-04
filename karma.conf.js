var webpackConf = require('./webpack.config.js'),
    lodash = require('lodash-node'),
    opts = lodash.cloneDeep(webpackConf);

module.exports = function (config) {
    var configuration = {
            customLaunchers: {
              'Chrome_travis_ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
              }
            },
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
        };

    if (process.env.TRAVIS) {
        // If we're running on Travis CI use the custom launcher
        configuration.browsers = ['Chrome_travis_ci', 'Firefox'];
    }

    config.set(configuration);
};
