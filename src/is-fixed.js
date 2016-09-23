define([
], function () {

    /**
     * Whether or not the element is positioned within a fixed element.
     *
     * @exports is-fixed
     *
     * @param {Object} ele The HTMLNode in which to get the axis of.
     *
     * @returns {Boolean} When the element is positioned within a fixed element.
     *
     * @example
     * ```js
     * var ele = '<div style="position: fixed; margin-left: 140px;"></div>',
     * 	testEle = '<div></div>';
     *
     * ele.appendChild(testEle);
     *
     * isFixed(testEle);
     * // Returns true/false
     * ```
     */
    function isFixed (ele) {
        var doc = ele.ownerDocument,
            win = doc.defaultView || doc.parentWindow;

        try {
            while (ele.offsetParent) {
                ele = ele.offsetParent;
                // If we have already found that the element is within a fixed element no longer check the current
                // element. Uses `getComputedStyle` to get the position allowing for CSS or Style tag.
                if (win.getComputedStyle(ele).getPropertyValue('position') === 'fixed') {
                    return true;
                }
            }
        } catch (error) {
        }

        return false;
    }

    return isFixed;
});
