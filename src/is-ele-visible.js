define([
    'aux/is-ele-in-viewport'
], function (isEleInViewport) {

    /**
     * Checks whether an element is currently visible on the page (checking if an element is over the top)
     *
     * @param  {Object}  ele The element in which to check
     * @param  {Object}  options Optionally pass specific options to the checker
     * @property {Boolean=}  options.viewport   Should also be within the current viewport (Defaults false)
     * @property {Object=}   options.win        Set which window in order to check the element is visible within
     * @property {Boolean=}  options.fully      Check all corners of the element is visible (Defaults to false)
     *
     * @return {Boolean}     Whether the element is visible or has element's layered over the top
     */
    function isEleVisible (ele, options) {
        var win = options.win || window,
            doc = win.document,
            viewport = options.viewport || false,
            fully = options.fully || false,
            rect = ele.getBoundingClientRect(),
            efp = function (x, y) {
                return doc.elementFromPoint(x, y);
            };

        // Check that the element is currently within the viewport
        if (viewport && !isEleVisible(ele, win)) {
            return false;
        }

        if (fully) {
            // Return true if any of its four corners are visible
            return (
                  ele.contains(efp(rect.left,  rect.top)) &&  ele.contains(efp(rect.right, rect.top)) &&
                  ele.contains(efp(rect.right, rect.bottom)) &&  ele.contains(efp(rect.left,  rect.bottom))
            );
        } else {
            // Return true if any of its four corners are visible
            return (
                  ele.contains(efp(rect.left,  rect.top)) ||  ele.contains(efp(rect.right, rect.top)) ||
                  ele.contains(efp(rect.right, rect.bottom)) ||  ele.contains(efp(rect.left,  rect.bottom))
            );
        }

    }

    return isEleVisible;

});
