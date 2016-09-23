define([
    'aux/has-property',
    'aux/offset'
], function (hasProperty, offset) {

    /**
     * @constructor
     * @description
     * A module to get the X and Y offset of an element to the passed window.
     *
     * @exports offset-rect
     *
     * @requires module:has-property
     * @requires module:offet
     *
     * @example
     * ```js
     * var offsetRect = new OffsetRect(),
     *  ele = '<div style="margin-top: 10px; margin-left: 140px;"></div>',
     * 	testEle = '<div></div>'
     *  win = top.window;
     *
     * ele.appendChild(testEle);
     *
     * offsetRect.getOffsetRect(testEle, win);
     * // Returns
     * {
     * 	x: 10,
     * 	y: 140
     * }
     * ```
     */
    function OffsetRect () {}

    /**
     * Get the scroll position of the document passed
     *
     * @memberOf module:offset-rect
     *
     * @private
     *
     * @param {Object} doc The HTML document in which to get the scroll values.
     *
     * @returns {Object} scroll The scrollX and scrollY of the offset from the window
     * @property {Number} scroll.scrollX The scrollX of the document from the window (top).
     * @property {Number} scroll.scrollY The scrollY of the document from the window (left).
     */
    OffsetRect.prototype.getScroll = function (doc) {
        var body = doc.body,
            scrollX = (((ele = doc.documentElement) || (ele = body.parentNode)) &&
                typeof ele.scrollLeft == 'number' ? ele : body).scrollLeft,
            scrollY = (((ele = doc.documentElement) || (ele = body.parentNode)) &&
                typeof ele.scrollTop == 'number' ? ele : body).scrollTop;

        return {
            scrollX: scrollX,
            scrollY: scrollY
        };
    };

    /**
     * Get get the X and Y offset of an element to the passed window.
     *
     * @memberOf module:offset-rect
     *
     * @public
     *
     * @param {Object} ele The HTMLNode in which to get the axis of.
     * @param {Object} wind The window in which to get the offset
     *
     * @returns {Object} offset The X and Y axis of the offset from the window
     * @property {Number} offset.x The X axis of the offset from the window (top).
     * @property {Number} offset.y The Y axis of the offset from the window (left).
     */
    OffsetRect.prototype.getOffsetRect = function (ele, wind) {
        var doc = ele.ownerDocument,
            win = wind || windoc.defaultView || doc.parentWindow,
            scroll,
            scrollX,
            scrollY,
            rect,
            top = 0,
            left = 0;

        if (hasProperty(win, 'pageYOffset') && hasProperty(win, 'pageXOffset')) {
            scrollY = win.pageYOffset;
            scrollX = win.pageXOffset;
        } else {
            scroll = this.getScroll(doc);
            scrollY = scroll.scrollY;
            scrollX = scroll.scrollX;
        }

        if (typeof ele.getBoundingClientRect === 'function') {
            rect = ele.getBoundingClientRect();
            top  = rect.top + scrollY;
            left = rect.left + scrollX;
        } else {
            rect = offset(ele);
            top  = rect.y + scrollY;
            left = rect.x + scrollX;
        }

        return {
            y: Math.round(top),
            x: Math.round(left)
        };
    };

    return OffsetRect;
});
