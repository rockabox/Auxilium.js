var path = require('path'),
    aliases = require(path.join(__dirname, 'webpack.base.config.js'));

module.exports = {
    cache: true,
    plugins: [],
    resolve: {
        alias: aliases
    }
};
