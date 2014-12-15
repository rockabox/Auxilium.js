define([
    'utils/has-class'
], function (hasClass) {
    /**
     * A cross-browser function usable for IE7+, Chrome, Firefox & Safari in order to search within an element for all
     * elements with a specific class name.
     *
     * @param {object}      parent       The parent element in which to search through for the element.
     * @param {string}      className    A string representation of the class name in which to search for.
     * @param {string=*}    tagName      A string representation of the tag name the class is assigned to.
     *
     * @returns {object} result An array of elements found within the element with the class passed through.
     */
    function getElementByClassName (parent, className, tagName) {
        var tag = (tagName) ? tagName : '*',
            result = [],
            els = parent.getElementsByTagName(tag);

        for (var i = 0; i < els.length; i++) {
            if (hasClass(els[i], className)) {
                result.push(els[i]);
            }
        }

        return result;
    }

    return getElementByClassName;
});
