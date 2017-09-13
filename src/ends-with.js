define([
], function () {
    /**
     * Tests whether a string ends with a particular string i.e. Auxilium.js ends with .js.
     *
     * @exports ends-with
     *
     * @param {String} str The string in which to test against.
     * @param {String} suffix What the string should end with.
     *
     * @example
     * var test = 'debug.scoota.com';
     * endsWith(test, 'scoota.co'); // Returns false
     * endsWith(test, 'scoota.com'); // Returns true
     */
    function endsWith (str, suffix) {
        if (!str || !suffix) {
            return false;
        }

        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    return endsWith;
});
