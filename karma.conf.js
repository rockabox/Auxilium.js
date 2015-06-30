var webpackConf = require('./webpack.config.js'),
    lodash = require('lodash-node'),
    opts = lodash.cloneDeep(webpackConf);

opts.module = opts.module || {};
// Use the istanbul-instrumenter loader to be able to gather coverage reports from webpack.
opts.module.postLoaders = [
    {
        test: /\.js$/,
        exclude: /(tests|node_modules|bower_components)\//,
        loader: 'istanbul-instrumenter'
    }
];

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
                'progress',
                'coverage'
            ],
            coverageReporter: {
                type: 'html',
                dir: 'coverage/'
            },
            preprocessors: {
                'tests/**/*.spec.js': [
                    'webpack'
                ]
            },
            webpack: opts
        };

    if (process.env.TRAVIS) {
        // If we're running on Travis CI use the custom launcher & use coveralls reporter
        configuration.browsers = [
            'Chrome_travis_ci',
            'Firefox'
        ];
        configuration.coverageReporter = {
            type: 'lcovonly',
            dir: 'coverage'
        };
    }

    config.set(configuration);
};
