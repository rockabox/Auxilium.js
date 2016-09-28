define([
], function () {

    /**
     * Gets the X and Y offset of an element to the current window and whether or not the element is positioned within
     * a fixed element.
     *
     * @exports offset
     *
     * @param {Object} ele The HTMLNode in which to get the axis of.
     *
     * @returns {Object} offset The X and Y axis of the offset from the window
     * @property {Number} offset.x The X axis of the offset from the window (top).
     * @property {Number} offset.y The Y axis of the offset from the window (left).
     * @property {Boolean} offset.fixed Whether or not the element is nested within a fixed element.
     *
     * @example
     * ```js
     * var ele = '<div style="margin-top: 10px; margin-left: 140px;"></div>',
     * 	testEle = '<div></div>';
     *
     * ele.appendChild(testEle);
     *
     * offset(testEle);
     * // Returns
     * {
     * 	x: 10,
     * 	y: 140,
     * 	fixed: true
     * }
     * ```
     */
    function offset (ele) {
        var doc = ele.ownerDocument,
            win = doc.defaultView || doc.parentWindow,
            left = ele.offsetLeft,
            top = ele.offsetTop,
            positionFixed = false;

        // When we are within a nested element we need to check the offset of the parent and ensure we take the top
        // offset of that element in to consideration when getting the offset of the element compared to the window.
        try {
            while (ele.offsetParent) {
                ele = ele.offsetParent;

                try {
                    // If we have already found that the element is within a fixed element no longer check the current
                    // element. Uses `getComputedStyle` to get the position allowing for CSS or Style tag.
                    if (win.getComputedStyle(ele).getPropertyValue('position') === 'fixed') {
                        positionFixed = true;
                    }
                }  catch (error) {
                }
                left += ele.offsetLeft;
                top += ele.offsetTop;
            }
        } catch (error) {
        }
        return {
            y: top,
            x: left,
            fixed: positionFixed
        };
    }

    return offset;
});
