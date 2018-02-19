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
     * @requires module:attach-css
     * @requires module:offset
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
     * Get the scroll position of the element depending on the current viewport
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Object} params Contains parameters we need to calculate scroll position.
     * @property {Number} params.eleHeight The full size of the element.
     * @property {Number} params.offsetTop The offsetTop offset of the element.
     * @property {Object} params.winPosition Get the positional data from the window.
     * @property {Object} params.ele The element in which to set the position on
     */
    ParallaxScrolling.prototype._getScrollPosition = function (params) {
        var offsetTop = params.offsetTop,
            winPosition = params.winPosition,
            scrollTop = winPosition.scrollTop,
            positionParams;

        if (scrollTop >= offsetTop) {
            positionParams = {
                scrollProgress: 0,
                scrollY: scrollTop - offsetTop
            };

            this._setElePosition(params.ele, positionParams.scrollY);

            return positionParams;
        }

        var eleHeight = params.eleHeight,
            winHeight = winPosition.winHeight;

        if (winHeight > eleHeight) {
            positionParams = this._largerWindow(eleHeight, offsetTop, scrollTop, winHeight);
        } else {
            positionParams = this._smallerWindow(eleHeight, offsetTop, scrollTop, winHeight);
        }

        this._setElePosition(params.ele, positionParams.scrollY);

        return positionParams;
    };

    /**
     * Parallax scroll when the window is smaller than the height of the parallax element
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Number} eleHeight The full size of the element.
     * @param {Number} offsetTop The offset from the top of the element
     * @param {Number} scrollTop The amount that the browser has been scrolled from the top of the body
     * @param {Number} winHeight The total height of the browser window.
     */
    ParallaxScrolling.prototype._smallerWindow = function (eleHeight, offsetTop, scrollTop, winHeight) {
        // How much the slot has scrolled compared to the window scroll position
        var scrollProgress = (offsetTop - scrollTop) / winHeight;

        return {
            scrollProgress: scrollProgress,
            scrollY: -Math.abs(eleHeight * scrollProgress)
        };
    };

    /**
     * Parallax scroll when the window is larger than the height of the parallax element
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Number} eleHeight The full size of the element.
     * @param {Number} offsetTop The offset from the top of the element
     * @param {Number} scrollTop The amount that the browser has been scrolled from the top of the body
     * @param {Number} winHeight The total height of the browser window.
     */
    ParallaxScrolling.prototype._largerWindow = function (eleHeight, offsetTop, scrollTop, winHeight) {
        var scrollDistance = offsetTop - scrollTop, // Distance slot has scrolled in window
            bottom = winHeight - scrollDistance, // Bottom of window
            leftToShow = eleHeight - bottom; // Pixels left to show of the element;

        if (leftToShow <= 0) {
            var topPosition = offsetTop - scrollTop;

            // If the element is at the top of the browser viewport
            if (topPosition <= 0) {
                scrollY = Math.abs(topPosition);
                // The scroll progress will be 100 percent when the top position is equal to the visibleHeight
                scrollProgress = 1 - ((eleHeight - scrollY) / eleHeight);
            } else {
                // Parallax element is at the top of the creative element it stops scrolling until
                // the creative element reach the top of the window.
                scrollY = 0;
                // scrollProgress is equal to the parallax element height minus the size of element
                // that should be viewable at any time.
                scrollProgress = 1 - (eleHeight / eleHeight);
            }
        } else {
            // the scroll progress is calculate from initial size of the minimum viewable part base on
            // how many pixel it has scroll.
            scrollProgress = 1 - (bottom / eleHeight);
            scrollY = bottom - eleHeight;
        }

        return {
            scrollProgress: scrollProgress,
            scrollY: scrollY
        };
    };

    /**
     * Get the positional data from the window
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param  {Object} viewport The viewport in which to check against (an element or the window).
     * @return {Object} positions
     * @property {Number} positions.scrollTop The offset of the viewport compared to the window
     * @property {Number} positions.winHeight The total height of the window
     *
     */
    ParallaxScrolling.prototype._getWindowPositions = function (viewport) {
        var scrollTop = viewport.pageYOffset,
            winHeight = viewport.innerHeight;

        return {
            scrollTop: (typeof scrollTop !== 'undefined') ? scrollTop : viewport.scrollTop,
            winHeight: (typeof winHeight !== 'undefined') ? winHeight : viewport.clientHeight
        };
    };

    /**
     * Trigger an event of aux.scroll-percent with the percentage when a tenth percentile, ensuring that it does not
     * trigger more than once for a percent.
     *
     * @memberOf module:parallax-scrolling
     *
     * @protected
     *
     * @param {Number} progress The scroll progress in which to trigger.
     * @param {Function} callback A function in which to trigger percentages
     */
    ParallaxScrolling.prototype.percentageTrigger = function (progress, callback) {
        var percentage = Math.floor((1 - progress) * 10) * 10;

        if (progress !== this._lastProgress) {
            this._lastProgress = progress;

            callback(percentage);
        }
    };

    /**
     * Set the elements scrollY postion (uses top)
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Object} ele    The element in which to attach the positional scrollY to.
     * @param {Number} scrollY The positional scrollY in which to attach to the element.
     *
     * @return {Object} The original element passed through with the new positional scrollY attached (to top).
     */
    ParallaxScrolling.prototype._setElePosition = function (ele, scrollY) {
        this._attachCss(ele, {
            transform: 'translate3d(0, ' + scrollY + 'px, 0)'
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
     * @param  {Object=} viewport       Optionally pass the viewport of the browser (element or window)
     *
     * @returns {Object} An object of helper functions to be used the main handler function to be fire.
     */
    ParallaxScrolling.prototype.init = function (ele, container, eleHeight, viewableHeight, viewport) {
        // Default to the current window if it hasn't been passed through to the helper
        viewport = viewport || window;

        var $this = this,
            offsetTop = this._offset(container).y;

        this._container = container;

        this._attachCss(ele, {
            'will-change': 'transform'
        });

        return {
            _lastProgress: -1,
            /**
             * A handler in which to fire when scrolling.
             * Allows passing a new window viewport through the handler and the offset of the container.
             *
             * @param  {Object?} overrideViewport A new window object to be used (useful for iFrame neseting).
             * @param  {Object?} overrideOffset Manually override the offset of the container (iframe nesting again).
             *
             * @returns {Number} The scrollY position of the what the element should be.
             */
            handler: function (overrideViewport, overrideOffset) {
                overrideViewport = overrideViewport || viewport;
                overrideOffset = overrideOffset || offsetTop;

                return $this._getScrollPosition({
                    ele: ele,
                    eleHeight: eleHeight,
                    offsetTop: overrideOffset,
                    winPosition: $this._getWindowPositions(overrideViewport)
                });
            },
            /**
             * Reset the offset top that is used by the handler this is to be used by scroll or resize events for
             * example.
             *
             * @returns {Number} The top offset of the container element.
             */
            resetOffset: function () {
                offsetTop = $this._offset($this._container).y;

                return offsetTop;
            },
            percentageTrigger: $this.percentageTrigger
        };
    };

    return ParallaxScrolling;
});
