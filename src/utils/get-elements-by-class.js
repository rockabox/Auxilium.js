/**
 * A cross-browser module which gets all elements by class name.
 * @module utils/get-elements-by-class
 */
define([
    'utils/has-class'
], function (hasClass) {
    /**
     * A cross-browser function usable for IE7+, Chrome, Firefox & Safari in order to search within
     * an element for all elements with a specific class name.
     *
     * @memberOf module:utils/get-elements-by-class
     *
     * @param {object}      parent       The parent element in which to search through for the element.
     * @param {string}      className    A string representation of the class name in which to search for.
     * @param {string=?}    tagName      A string representation of the tag name the class is assigned to.
     *
     * @returns {object} result An array of elements found within the element with the class passed through.
     *
     * @example
     * // DOM
     * &lt;div id="main-content"&gt;
     * 		&lt;div class="muppets" id="kermit"&gt;
     * 			&lt;span class="muppets" id="miss-piggy"&gt;&lt;/span&gt;
     *    &lt;/div&gt;
     *    &lt;div class="muppets" id="gonzo"&gt;
     * 	  		&lt;span class="muppets" id="rat"&gt;&lt;/span&gt;
     *      &lt;/div&gt;
     *      &lt;div class="muppets" id="fuzzy"&gt;&lt;/div&gt;
     * &lt;/div&gt;
     *
     * // JS
     * var eles = getElementByClassName(document.body, 'muppets');
     * // Returns
     * // All elements with class muppets, id's:
     * // - kermit
     * // - miss-piggy
     * // - gonzo
     * // - rat
     * // - fuzzy
     *
     * var mainContent = document.getElementById('main-content'),
     * 		eleSpan = getElementByClassName(mainContent, 'muppets', 'span');
     * // Returns
     * // Elements with class muppets and is a span tag
     * // - miss-piggy
     * // - rat
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
