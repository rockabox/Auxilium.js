define([
    'utils/has-class'
], function (hasClass) {
    /**
     * Remove class from an element.
     *
     * @param  {object} ele  Element to remove class from.
     * @param  {string} name Class name in which to remove.
     *
     * @requires hasClass
     *
     * @return {object}      Element with class removed.
     *
     * @example
     * var element = '<div class="red-dwarf lister">';
     * element = removeClass('lister');
     *
     * // Returns
     * // element (<div class="red-dwarf"></div>)
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
