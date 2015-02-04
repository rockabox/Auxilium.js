var path = require('path'),
    aliases = require('./webpack.base.config.js');

module.exports = {
    cache: true,
    plugins: [],
    resolve: {
        alias: aliases
    }
};
