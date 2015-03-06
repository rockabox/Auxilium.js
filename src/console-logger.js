define([
    'aux/is-defined'
], function (isDefined) {
    /**
     * Using the browsers console logging options, allowing to use console.error if accessible otherwise fallsback to
     * console.log (again if accessible).
     *
     * @exports console-logger
     *
     * @requires module:is-defined
     *
     * @param {*} message Message to log out
     * @param {String} type What logging system to use error, log (defaults to log).
     */
    function logger (message, type) {
        var console = window.console;
        type = type || 'log';

        if (isDefined(console[type], 'function')) {
            console[type](message);
        } else if (isDefined(console.log, 'function')) {
            console.log(message);
        }
    }

    return logger;
});
