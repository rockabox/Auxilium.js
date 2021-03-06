module.exports = function (grunt) {
    'use strict';

    require('load-grunt-config')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'jshint:json',
        'jshint:js',
        'eslint:target'
    ]);

    grunt.registerTask('sauce-labs', [
        'karma:unit-sauce'
    ]);

    grunt.registerTask('test', [
        'lint',
        'karma:unit'
    ]);

    grunt.registerTask('ci-test', [
        'test',
        'sauce-labs',
        'coveralls'
    ]);
};
