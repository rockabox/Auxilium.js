define([
], function () {

    /**
     * Gets the X and Y offset of an element to the current window
     *
     * @exports offset
     *
     * @param {Object} ele The HTMLNode in which to get the axis of.
     *
     * @returns {Object} The X and Y axis of the offset from the window
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
     * 	y: 140
     * }
     * ```
     */
    function offset (ele) {
        var left = ele.offsetLeft,
            top = ele.offsetTop;

        // When we are within a nested element we need to check the offset of the parent and ensure we take the top
        // offset of that element in to consideration when getting the offset of the element compared to the window.
        try {
            while (ele.offsetParent) {
                ele = ele.offsetParent;
                left += ele.offsetLeft;
                top += ele.offsetTop;
            }
        } catch (error) {
        }

        return {
            y: top,
            x: left
        };
    }

    return offset;
});
