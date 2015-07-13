define([
    'aux/attach-css'
], function (attachCss) {

    /**
     * Scroll an HTML element at a different rate to the browsers scroll ensuring that all of the element's content
     * is displayed whilst it's in view of the viewport
     *
     * NOTE: It is required that the element is positioned with absoulte relative to it's wrapper.
     *
     * @exports parallax-scrolling
     *
     * @todo It would be nice in the future to allow for setting an offset letting the element be partially in view
     * to start scrolling rather than all of the element needing to be in view
     *
     * @requires module:aux/attach-css
     *
     * @param  {Object} ele        The element in which to scroll
     * @param  {Number} eleHeight  The full size of the element
     * @param  {Number} viewableHeight The amount of the element in which should be viewable at any one time
     * @param  {Boolean} [invert=false] Whether or not to scroll the content inversed (Bottom to Top) or (Top to Bottom)
     * @param  {Object=} win       Optionally pass the window in which should be checked for the size of the viewport
     *
     * @return {Number}            The positioning of the element (in pixels)
     */
    function parallaxScrolling (ele, eleHeight, viewableHeight, invert, win) {
        // Default to the current window if it hasn't been passed through to the helper
        win = win || window;
        // Whether or not to use inverted scrolling direction (defaulting to normal direction)
        invert = invert || false;

        var offsetTop = win.pageYOffset,
            container = ele.parentNode,
            distance = (win.innerHeight - viewableHeight),
            scrollDistance = (eleHeight - viewableHeight),
            top = container.offsetTop,
            ratio,
            margin,
            css = {};

        // When we are within a nested element we need to check the offset of the parent and ensure we take the top
        // offset of that element in to consideration when checking scrolling our element
        while (container.offsetParent) {
            container = container.offsetParent;
            top += container.offsetTop;
        }

        // Check that the htmlNode is fully within the viewport before starting to scroll
        if (offsetTop < top && (offsetTop + distance) > top) {
            // Gets the ratio (scroll speed) to be able to show all of the element within the viewable height, dependant
            // on the viewport size.
            ratio = (top - offsetTop) / distance;
            // When inverting the ratio should be used straight away otherwise taking away 1 from the ratio forces it to
            // scroll the normal direction
            ratio = (invert) ? (ratio) : (1 - ratio);
            margin = '-' + (scrollDistance * ratio) + 'px';
        } else if ((offsetTop + distance) <= top) {
            if (invert) {
                // When we are inverting the scrolling and the element hits the top of the viewport ensure that it is
                // set to be at the bottom of the element
                margin = scrollDistance * -1 + 'px';
            } else {
                // When we are not inverting the scrolling and the element hits the top of the viewport ensure that it
                // is set to be at the top of the element
                margin = 0;
            }
        } else {
            if (invert) {
                // When we are inverting the scrolling and the element hits the bottom of the viewport ensure that it is
                // set to be at the top of the element
                margin = 0;
            } else {
                // When we are not inverting the scrolling and the element hits the bottom of the viewport ensure that
                // it is set to be at the bottom of the element
                margin = scrollDistance * -1 + 'px';
            }
        }

        css['top'] = margin;

        attachCss(ele, css);

        return margin;
    }

    return parallaxScrolling;
});
