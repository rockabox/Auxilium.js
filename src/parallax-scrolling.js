define([
    'aux/attach-css',
    'aux/offset'
], function (attachCss, offset) {

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
     * @requires module:aux/offset
     *
     * @example
     * ```js
     * var parallaxScrolling = new ParallaxScrolling(),
     * 	parallaxHelper = parallaxScrolling.init(ele, 300, 100, true, window);
     *
     * // When the window is scrolled we want to fire the parallax handler
     * events.addListener(window, 'scroll', function () {
     * 	parallaxHelper();
     * });
     *
     * // When the window is resized we want to fire the parallax helper
     * events.addListener(window, 'resize', function () {
     * 	parallaxHelper();
     * });
     * ```
     */
    function ParallaxScrolling () {
        this._attachCss = attachCss;
        this._offset = offset;
    }

    /**
     * Get the marginal position of the element depending on the current viewport
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param  {Number} offsetTop The offsetTop offset of the element.
     * @param  {Number} scrollDistance The distance of the viewable height compared to the position of the window height
     * @param  {Number} distance  The distance between the windows height and the viewable height.
     * @param  {Number} scrollTop The offset top of the current viewport compared to the window.
     *
     * @return {Number} The margin number of the what the element should be
     */
    ParallaxScrolling.prototype._getMargin = function (offsetTop, scrollDistance, distance, scrollTop) {
        var ratio;

        // Check that the htmlNode is fully within the viewport before starting to scroll
        if (scrollTop < offsetTop && (scrollTop + distance) > offsetTop) {
            // Gets the ratio (scroll speed) to be able to show all of the element within the viewable height, dependant
            // on the viewport size.
            ratio = this._getRatio(offsetTop, scrollTop, distance, this.invert);
            margin = '-' + (scrollDistance * ratio) + 'px';
        } else if ((scrollTop + distance) <= offsetTop) {
            if (this.invert) {
                // Set the element to show from the bottom of the content (when inverted and at the top)
                margin = this._positionBottom(scrollDistance);
            } else {
                // Set the element to show from the top of the content (when not inverted and at the top)
                margin = this._positionTop();
            }
        } else {
            if (this.invert) {
                // Set the element to show from the top of the content (when inverted and at the top)
                margin = this._positionTop();
            } else {
                // Set the element to show from the bottom of the content (when not inverted and at the top)
                margin = this._positionBottom(scrollDistance);
            }
        }

        return margin;
    };

    /**
     * Get the ratio of which the scrolling speed needs to be set (dependant on whether the scrolling should be
     * inverted or not).
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param  {Number} offsetTop The offsetTop offset of the element.
     * @param  {Number} scrollTop The offset top of the current viewport compared to the window.
     * @param  {Number} distance  The distance between the windows height and the viewable height.
     * @param  {Boolean} invert   Whether or not to invert the scrolling direction.
     *
     * @return {Number}           The ratio of speed in which to scroll the content.
     */
    ParallaxScrolling.prototype._getRatio = function (offsetTop, scrollTop, distance, invert) {
        var ratio = (offsetTop - scrollTop) / distance;

        // When inverting the ratio should be used straight away otherwise taking away 1 from the ratio forces it to
        // scroll the normal direction
        if (!invert) {
            ratio = 1 - ratio;
        }

        return ratio;
    };

    /**
     * Get the positional data from the window
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param  {Object} win The window in which to check against.
     * @return {Object} positions
     * @property {Number} positions.scrollTop The offset of the viewport compared to the window
     * @property {Number} positions.winHeight The total height of the window
     *
     */
    ParallaxScrolling.prototype._getWindowPositions = function (win) {
        return {
            scrollTop:  win.pageYOffset || win.document.documentElement.scrollTop,
            winHeight: win.innerHeight || win.document.documentElement.clientHeight
        };
    };

    /**
     * Get the value for the positional value for setting to show the top of the content
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @return {Number} The positional value for the content showing at the top of the element.
     */
    ParallaxScrolling.prototype._positionTop = function () {
        return 0;
    };

    /**
     * Get the value for the positional value for setting to show the bottom of the content, based on the entire
     * scrollable distance.
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @return {Number} The positional value for the content showing at the bottom of the element.
     */
    ParallaxScrolling.prototype._positionBottom = function (scrollDistance) {
        return (scrollDistance * -1) + 'px';
    };

    /**
     * Set the elements positional margin
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Object} ele    The element in which to attach the positional margin to.
     * @param {Number} margin The positional margin in which to attach to the element.
     *
     * @return {Object} The original element passed through with the new positional margin attached.
     */
    ParallaxScrolling.prototype._setElePosition = function (ele, margin) {
        this._attachCss(ele, {
            'top': margin
        });

        return ele;
    };

    /**
     * Initialise the a new parallax scrolling handler
     *
     * @memberOf module:parallax-scrolling
     *
     * @public
     *
     * @param  {Object} ele        The element in which to scroll
     * @param  {Object} container  The container of the element in which to take into consideration for scroll points
     * @param  {Number} eleHeight  The full size of the element
     * @param  {Number} viewableHeight The amount of the element in which should be viewable at any one time
     * @param  {Boolean} [invert=false] Whether or not to scroll the content inversed (Bottom to Top) or (Top to Bottom)
     * @param  {Object=} win       Optionally pass the window in which should be checked for the size of the viewport
     *
     * @returns {Function} A handler in which to fire when scrolling
     */
    ParallaxScrolling.prototype.init = function (ele, container, eleHeight, viewableHeight, invert, win) {

        // Default to the current window if it hasn't been passed through to the helper
        win = win || window;
        // Whether or not to use inverted scrolling direction (defaulting to normal direction)
        this.invert = invert || false;

        var $this = this,
            offsetTop = this._offset(container).y,
            scrollDistance = (eleHeight - viewableHeight);

        // The handler in which to be used for firing when scrolling
        return function () {
            var winPosition = $this._getWindowPositions(win),
                margin = 0,
                distance,
                scrollTop = winPosition.scrollTop;

            // Set the distance of the viewable height compared to the position of the window height
            distance = (winPosition.winHeight  - viewableHeight);

            margin = $this._getMargin(offsetTop, scrollDistance, distance, scrollTop);
            $this._setElePosition(ele, margin);

            return margin;
        };
    };

    return ParallaxScrolling;
});
