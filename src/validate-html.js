define([
], function () {
    /**
     * @exports validate-html
     * @description
     * Checks that HTML as string is valid HTML (all tags are closing etc.)
     *
     * @param {String} html The html to validate
     *
     * @return {Boolean} Whether or not the html is valid
     *
     * @example
     * ```js
     * validateHtml('<div></div>');
     * // Returns true
     *
     * validateHtml('<div>');
     * // Returns false
     *
     * validateHtml('<div></div');
     * // Returns false
     * ```
     */
    function validateHtml (html) {
        var doc = document.createElement('div');
        doc.innerHTML = html;
        return (doc.innerHTML === html);
    }

    return validateHtml;
});
