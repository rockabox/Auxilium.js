/**
 * A module which will remove a single class from an element.
 * @module aux/remove-class
 * @requires module:aux/has-class
 */
define([
    'aux/has-class'
], function (hasClass) {
    /**
     * Remove class from an element.
     *
     * @memberOf module:aux/remove-class
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
