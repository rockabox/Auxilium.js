define([
], function () {

    /**
     * Converts a hyphen string into camel case
     * @exports hyphen-to-camel
     *
     * @param {String} string String to convert
     *
     * @return {String} Camel cased string
     *
     * @example
     * ```js
     * hyphenToCamel('barney-stinson');
     * // Returns
     * // barneyStinson
     * ```
     */
    function hyphenToCamel (string) {
        return string.replace(/-([a-z])/g, function (match) {
            return match[1].toUpperCase();
        });
    }

    return hyphenToCamel;
});
