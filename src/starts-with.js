define([
], function () {

    /**
     * @exports starts-with
     * @description
     * Test if a string start with a specified string
     *
     * @param {String} str String to test against
     * @param {String} test Does the string start with this?
     *
     * @return {Boolean} True if the string starts
     *
     * @example
     * ```js
     * startsWith('test-something', 'test'); // true
     * startsWith('no-something-test', 'test'); // false
     * ```
     */
    function startsWith (str, test) {
        return str.slice(0, test.length) === test;
    }

    return startsWith;
});
