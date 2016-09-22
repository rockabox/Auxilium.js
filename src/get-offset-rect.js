define([
    'aux/has-property'
], function (hasProperty) {

    /**
     * Gets the X and Y offset of an element to the passed window.
     *
     * @exports get-offset-rect
     *
     * @param {Object} ele The HTMLNode in which to get the axis of.
     * @param {Object} win The window in which to get the offset
     *
     * @returns {Object} offset The X and Y axis of the offset from the window
     * @property {Number} offset.x The X axis of the offset from the window (top).
     * @property {Number} offset.y The Y axis of the offset from the window (left).
     *
     * @example
     * ```js
     * var ele = '<div style="margin-top: 10px; margin-left: 140px;"></div>',
     * 	testEle = '<div></div>'
     *  win = top.window;
     *
     * ele.appendChild(testEle);
     *
     * getOffsetRect(testEle, win);
     * // Returns
     * {
     * 	x: 10,
     * 	y: 140
     * }
     * ```
     */
    function getOffsetRect (ele, win) {
        var doc = ele.ownerDocument,
            docElement = win.document,
            pageYOffset = hasProperty(win, 'pageYOffset') ? win.pageYOffset : docElement.scrollTop,
            pageXOffset = hasProperty(win, 'pageXOffset') ? win.pageXOffset : docElement.scrollLeft,
            clientTop = docElement.clientTop || doc.body.clientTop || 0,
            clientLeft = docElement.clientLeft || doc.body.clientLeft || 0,
            rect = ele.getBoundingClientRect(),
            top = 0,
            left = 0;

        if (rect) {
            top  = rect.top + pageYOffset - clientTop;
            left = rect.left + pageXOffset - clientLeft;
        }

        return {
            y: Math.round(top),
            x: Math.round(left)
        };
    }

    return getOffsetRect;
});
