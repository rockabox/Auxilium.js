var baseConf = require('./karma.conf.js');

module.exports = function (config) {
    var customLaunchers = {
            'sl_ie_8': {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '8'
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
            testName: 'Auxilium IE8 browser',
            username: process.env['SAUCE_USERNAME'],
            accessKey: process.env['SAUCE_ACCESS_KEY']
        },
        exclude: [
            // Inner HTML not supported in IE8
            'tests/**/inner-html.spec.js',
            'tests/**/offset.spec.js',
            // CSS3 not supported in IE8 as it does not support CSS3 what so ever.
            'tests/**/css-events.spec.js'
        ]
    });
};
