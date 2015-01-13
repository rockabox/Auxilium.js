/**
 * A module which will remove a single class from an element.
 * @module utils/remove-class
 * @see module:utils/has-class
 */
define([
    'utils/has-class'
], function (hasClass) {
    /**
     * Remove class from an element.
     *
     * @memberOf module:utils/remove-class
     *
     * @param  {object} ele  Element to remove class from.
     * @param  {string} name Class name in which to remove.
     *
     * @requires hasClass
     *
     * @return {object}      Element with class removed.
     *
     * @example
     * var element = '&lt;div class="red-dwarf lister"&gt;';
     * element = removeClass('lister');
     *
     * // Returns
     * // element (&lt;div class="red-dwarf"&gt;&lt;/div&gt;)
     */
    function removeClass (ele, name) {
        if (hasClass(ele, name)) {
            var exp = new RegExp('(\\s|^)' + name + '(\\s|$)');
            ele.className = ele.className
                                .replace(exp, ' ')
                                .replace(/^\s+|\s+$/g, '');
        }

        return ele;
    }

    return removeClass;
});
