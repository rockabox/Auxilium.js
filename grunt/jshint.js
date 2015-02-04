module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    js: [
        '**/*.js',
        '<%= excludes.files %>'
    ],
    json: [
        '**/*.json',
        '<%= excludes.files %>'
    ]
};
