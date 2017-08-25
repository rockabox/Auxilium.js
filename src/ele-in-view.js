define([
], function () {
    /**
     * Calculates the amount of pixels and the percentage in which an element is currently in view.
     *
     * @exports ele-in-view
     *
     * @param {Object} ele The element in which to check.
     * @param {Number} eleHeight The height of the element.
     * @param {Number} eleWidth The width of the element.
     * @param {Object} viewport The viewport for the element (window or parent scrolling element)
     * @param {String} type The type of the viewport ('window' or 'element')
     *
     * @returns {Object} An object containing the viewability of the element (the pixels and the ratio)
     *
     * @example
     * ```js
     * var div = document.getElementById('some-ele-id'),
     *      inView = eleInView(div, 250, 300, window, 'window');
     *
     * // Returns Object
     * // {
     * //   'pixels': 37500,
     * //   'ratio': 0.5,
     * //   'horizontal': {
     * //       'pixels': 300,
     * //       'ratio': 1
     * //   },
     * //   'vertical': {
     * //       'pixels': 125,
     * //       'ratio': 0.5
     * //   }
     * // }
     * ```
     */
    function eleInView (ele, eleHeight, eleWidth, viewport, type) {
        var rect = ele.getBoundingClientRect(),
            viewportHeight = (type === 'element') ? viewport.clientHeight : viewport.innerHeight,
            viewportWidth = (type === 'element') ? viewport.clientWidth : viewport.innerWidth,
            eleTop,
            eleBottom,
            eleLeft,
            eleRight,
            pixelsInView = {
                vertical: {},
                horizontal: {}
            };

        if (type === 'element') {
            var viewportRect = viewport.getBoundingClientRect();

            eleTop = rect.top - viewportRect.top;
            eleBottom = rect.bottom - viewportRect.top;
            eleLeft = rect.left - viewportRect.left;
            eleRight = rect.bottom - viewportRect.left;
        } else {
            eleTop = rect.top;
            eleBottom = rect.bottom;
            eleRight = rect.right;
            eleLeft = rect.left;
        }

        // Vertical
        pixelsInView.vertical.pixels = Math.max(0, eleTop > 0 ?
            Math.min(eleHeight, viewportHeight - eleTop) :
            (eleBottom < viewportHeight ? eleBottom : viewportHeight)
        );

        pixelsInView.vertical.ratio = parseFloat((pixelsInView.vertical.pixels / eleHeight).toFixed(2));

        // Horizontal
        pixelsInView.horizontal.pixels = Math.max(0, eleLeft > 0 ?
            Math.min(eleWidth, viewportWidth - eleLeft) :
            (eleRight < viewportWidth ? eleRight : viewportWidth)
        );

        pixelsInView.horizontal.ratio = parseFloat((pixelsInView.horizontal.pixels / eleWidth).toFixed(2));

        pixelsInView.ratio = parseFloat(
            ((pixelsInView.vertical.pixels * pixelsInView.horizontal.pixels) / (eleWidth * eleHeight)).toFixed(2)
        );
        pixelsInView.pixels = pixelsInView.vertical.pixels * pixelsInView.horizontal.pixels;

        return pixelsInView;
    }

    return eleInView;
});
