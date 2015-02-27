define([
], function () {

    /**
     * @exports is-defined
     *
     * Helper which checks whether a variable is defined or not.
     *
     * @param {*} check             The variable to check that is defined
     * @param {String} type    The type your expecting the variable to be defined as.
     *
     * @returns {Boolean} When the variable is undefined it will pass back false otherwise pass back true.
     *
     * @example
     * ```js
     * var barney;
     * isDefined(barney);
     * // Returns false
     *
     * var barney = 'stinson';
     * isDefined(barney);
     * // Returns true
     *
     * isDefined(barney, 'string');
     * // Returns true
     *
     * isDefined(barney, 'function');
     * // Returns false
     * ```
     */
    function isDefined (check, type) {
        // Check that the variable is a specific type
        if (type) {
            return (typeof check === type);
        }

        return (typeof check !== 'undefined');
    }

    return isDefined;
});
