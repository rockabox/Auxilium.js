/**
 * A module in order to get all elements with a specific tag name and fire a callback with the element .
 * @module aux/get-element-by-tag
 */
define([
], function () {
    /**
     * Get all elements with a certain tag name within an element and fire a callback passing the element.
     *
     * @memberOf module:aux/get-element-by-tag
     *
     * @param {object}   ele      The containing object in which to search within
     * @param {string}   tag      The type of tag name in which should be looked for
     * @param {Function} callback A function in which to be fired being passed the element found
     *
     * @returns All of the elements found with the tag specified inside the ele
     *
     * @example
     * // Within the DOM
     * &lt;div id="muppets"&gt;
     * 		&lt;div id="kermit"&gt;&lt;/div&gt;
     * 		&lt;div id="gonzo"&gt;&lt;/div&gt;
     * 		&lt;span id="fuzzy"&gt;&lt;/span&gt;
     * &lt;/div&gt;
     * // JS
     * var ele = document.getElementById('muppets'),
     * 		logEle = function (ele) {
     * 			console.log(ele);
     * 		},
     * 		eles = getElementByTag(ele, 'div', logEle);
     * // Returns &lt;div id="kermit"&gt;&lt;/div&gt; &lt;div id="gonzo"&gt;&lt;/div&gt;
     * // Will console log both elements div elements with id gonzo and kermit
     */
    function getElementByTag (ele, tag, callback) {
        var elements = ele.getElementsByTagName(tag);

        for (var i = 0, len = elements.length; i < len; i++) {
            callback(elements[i]);
        }

        return elements;
    }

    return getElementByTag;
});
