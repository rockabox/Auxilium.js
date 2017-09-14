var baseConf = require('./karma.conf.js');

module.exports = function (config) {
    var customLaunchers = {
        'sl_ie_10': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '10'
        },
        'sl_ie_11': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '11'
        },
        'firefox': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '30'
        }
    };

    baseConf(config);

    config.set({
        browsers: Object.keys(customLaunchers),
        customLaunchers: customLaunchers,
        reporters: [
            'progress',
            'saucelabs'
        ],
        sauceLabs: {
            testName: 'Auxilium IE10+ browsers',
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY,
            startConnect: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            }
        }
    });
};
