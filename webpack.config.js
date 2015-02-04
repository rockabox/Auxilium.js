var path = require('path');

module.exports = {
    cache: true,
    plugins: [],
    resolve: {
        alias: {
            aux: path.join(__dirname, 'src')
        }
    }
};
