define([
    './has-class'
], function (hasClass) {
    /**
     * A cross-browser function usable for IE7+, Chrome, Firefox & Safari in order to search within
     * an element for all elements with a specific class name.
     *
     * @exports get-elements-by-class
     *
     * @requires has-class
     *
     * @param {object} parent The parent element in which to search through for the element.
     * @param {string} className A string representation of the class name in which to search for.
     * @param {string=?} tagName A string representation of the tag name the class is assigned to.
     *
     * @returns {object} result An array of elements found within the element with the class passed through.
     *
     * @example
     * ```js
     * // DOM
     * <div id="main-content">
     * 		<div class="muppets" id="kermit">
     * 			<span class="muppets" id="miss-piggy"></span>
     *    </div>
     *    <div class="muppets" id="gonzo">
     * 	  		<span class="muppets" id="rat"></span>
     *      </div>
     *      <div class="muppets" id="fuzzy"></div>
     * </div>
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
     * ```
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
