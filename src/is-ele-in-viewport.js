define([
], function () {

    /**
     * @exports is-ele-in-viewport
     *
     * Checks whether or not a element is within the current viewport
     *
     * @param  {Object}  ele The element in which to check
     * @param  {Object=} win Opitionally pass which window to check
     * @return {Boolean}     The element is or is not within the viewport
     */
    function isEleInViewport (ele, win) {
        win = win || window;
        var rect = ele.getBoundingClientRect(),
            vWidth   = win.innerWidth || doc.documentElement.clientWidth,
            vHeight  = win.innerHeight || doc.documentElement.clientHeight,
            doc = win.document;

        return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= vWidth && rect.right <= vHeight);
    }

    return isEleInViewport;

});
