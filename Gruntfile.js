module.exports = function (grunt) {
    'use strict';

    require('load-grunt-config')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'jshint:json',
        'jshint:js',
        'jscs:src'
    ]);

    grunt.registerTask('test', [
        'lint'
    ]);
};
