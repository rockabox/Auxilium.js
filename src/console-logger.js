define([
    'aux/has-property'
], function (hasProperty) {
    /**
     * Using the browsers console logging options, allowing to use console.error if accessible otherwise fallsback to
     * console.log (again if accessible).
     *
     * @exports console-logger
     *
     * @requires module:has-property
     *
     * @param {*} message Message to log out
     * @param {String} type What logging system to use error, log (defaults to log).
     */
    function logger (message, type) {
        type = type || 'log';

        if (hasProperty(window, 'console.' + type)) {
            console[type](message);
        } else if (hasProperty(window, 'console.log')) {
            console.log(message);
        }
    }

    return logger;
});
