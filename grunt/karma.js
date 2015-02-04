module.exports = {
    unit: {
        configFile: 'karma.conf.js'
    },
    'unit-sauce': {
        configFile: 'karma.sauce.conf.js'
    },
    coveralls: {
        configFile: 'karma.conf.js',
        browsers: [
            'Firefox'
        ],
        coverageReporter: {
            type: 'html'
        },
        reporters: [
            'progress',
            'coverage'
        ]
    }
};
