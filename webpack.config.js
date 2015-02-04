var path = require('path');

module.exports = {
    cache: true,
    plugins: [],
    resolve: {
        alias: {
            utils: path.join(__dirname, 'src')
        }
    }
};
