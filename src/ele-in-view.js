define([
], function () {
    /**
     * Calculates the amount of pixels and the percentage in which an element is currently in view.
     *
     * @exports ele-in-view
     *
     * @param {Object} ele The element in which to check.
     * @param {Number} eleHeight The height of the element.
     * @param {Object} viewport The viewport for the element (window or parent scrolling element)
     * @param {String} type The type of the viewport ('window' or 'element')
     *
     * @returns {Object} An object containing the viewability of the element (the pixels and the ratio)
     *
     * @example
     * ```js
     * var div = document.getElementById('some-ele-id'),
     *      inView = eleInView(div, 250, window, 'window');
     *
     * // Returns Object
     * // {
     * //   'pixels': 125,
     * //   'ratio': 0.5
     * // }
     * ```
     */
    function eleInView (ele, eleHeight, viewport, type) {
        var rect = ele.getBoundingClientRect(),
            viewportHeight = (type === 'element') ? viewport.clientHeight : viewport.innerHeight,
            eleTop,
            eleBottom,
            pixelsInView;

        if (type === 'element') {
            var viewportRectTop = viewport.getBoundingClientRect().top;

            eleTop = rect.top - viewportRectTop;
            eleBottom = rect.bottom - viewportRectTop;
        } else {
            eleTop = rect.top;
            eleBottom = rect.bottom;
        }

        pixelsInView = Math.max(0, eleTop > 0 ?
            Math.min(eleHeight, viewportHeight - eleTop) :
            (eleBottom < viewportHeight ? eleBottom : viewportHeight)
        );

        return {
            pixels: pixelsInView,
            ratio: parseFloat((pixelsInView / eleHeight).toFixed(2))
        };
    }

    return eleInView;
});
