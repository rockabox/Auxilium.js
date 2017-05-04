define([
    'aux/attach-css',
    'aux/events',
    'aux/has-property',
    'aux/offset'
], function (attachCss, Events, hasProperty, offset) {
    var events = new Events();

    /**
     * Scroll an HTML element at a different rate to the browsers scroll ensuring that all of the element's content
     * is displayed whilst it's in view of the viewport
     *
     * NOTE: It is required that the element is positioned with absoulte relative to it's wrapper.
     *
     * @exports parallax-scrolling
     *
     * @requires module:attach-css
     * @requires module:events
     * @requires module:has-property
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
        this._lastPercent = -1;
    }

    /**
     * The Auxillium event system used by the Parallax scrolling module
     * @see module:events
     *
     * @type {Object}
     */
    ParallaxScrolling.prototype._events = events;

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
     * @property {Number} params.visibleHeight The number of pixels showing within the viewport.
     * @property {Object} params.winPosition Get the positional data from the window.
     *
     * @return {Object} scrollPosition
     * @property {Number} scrollPosition.scrollProgress The ratio scrolled.
     * @property {Number} scrollPosition.scrollY The scrollY position of the what the element should be.
     */
    ParallaxScrolling.prototype._getScrollPosition = function (params) {
        var scrollY,
            eleHeight = params.eleHeight,
            offsetTop = params.offsetTop,
            visibleHeight = params.visibleHeight,
            winPosition = params.winPosition;

        if (this._isTop(winPosition, offsetTop, visibleHeight)) {
            scrollProgress = 0;
            scrollY = visibleHeight;
        } else if (this._isScrollable(winPosition, offsetTop, visibleHeight)) {
            var ratio,
                // How much the slot has scrolled compared to the window scroll position
                scrollDistance = (offsetTop + visibleHeight) - winPosition.scrollTop;

            // Calculate how much the content has scrolled
            scrollProgress = scrollDistance / winPosition.winHeight;
            ratio = eleHeight * scrollProgress;
            scrollY = visibleHeight - ratio;
        } else {
            scrollProgress = 1;
            scrollY = visibleHeight - eleHeight;
        }

        return {
            scrollProgress: scrollProgress,
            scrollY: scrollY
        };
    };

    /**
     * Check to see if an element is currently at the top of the page.
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Object} winPosition Get the positional data from the window.
     * @param {Number} offsetTop The offsetTop offset of the element.
     * @param {Number} visibleHeight The number of pixels showing within the viewport.
     *
     * @return {Boolean} True if an element is currently at the top of the page.
     */
    ParallaxScrolling.prototype._isTop = function (winPosition, offsetTop, visibleHeight) {
        return (winPosition.scrollTop >= offsetTop + visibleHeight);
    };

    /**
     * Check to see if an element is within the scrollable area of the page.
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param {Object} winPosition Get the positional data from the window.
     * @param {Number} offsetTop The offsetTop offset of the element.
     * @param {Number} visibleHeight The number of pixels showing within the viewport.
     *
     * @return {Boolean} True if an element is within the scrollable area of the page.
     */
    ParallaxScrolling.prototype._isScrollable = function (winPosition, offsetTop, visibleHeight) {
        return (winPosition.scrollTop <= offsetTop + visibleHeight) &&
            (winPosition.scrollTop + winPosition.winHeight) >= (offsetTop + visibleHeight);
    };

    /**
     * Get the positional data from the window
     *
     * @memberOf module:parallax-scrolling
     *
     * @private
     *
     * @param  {Object} viewport The viewport in which to check against (an element or the window).
     * @param  {Object} type The type of the viewport (element or window)
     * @return {Object} positions
     * @property {Number} positions.scrollTop The offset of the viewport compared to the window
     * @property {Number} positions.winHeight The total height of the window
     *
     */
    ParallaxScrolling.prototype._getWindowPositions = function (viewport, type) {
        var pageYOffset,
            innerHeight;

        // We are not scrolling via the window and instead by an element
        if (type === 'element') {
            pageYOffset = viewport.scrollTop;
            innerHeight = viewport.clientHeight;
        } else {
            pageYOffset = hasProperty(viewport, 'pageYOffset') ? viewport.pageYOffset :
                viewport.document.documentElement.scrollTop;
            innerHeight = hasProperty(viewport, 'innerHeight') ? viewport.innerHeight :
                viewport.document.documentElement.clientHeight;
        }


        return {
            scrollTop:  pageYOffset,
            winHeight: innerHeight
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
     * @param  {Object} ele        The element in which to trigger the event on.
     * @param  {Number} percentage The percentage (rounded) in which to trigger.
     * @return {Boolean}           Whether the percentage was triggered or not.
     */
    ParallaxScrolling.prototype._scrollPercentTriggers = function (ele, percentage) {
        var roundedPercent = Math.floor(percentage / 10) * 10,
            triggered = false;

        if (roundedPercent !== this._lastPercent) {
            this._lastPercent = roundedPercent;

            this._events.triggerEvent(ele, 'aux.scroll-percent', {
                percent: roundedPercent
            });

            triggered = true;
        }

        return triggered;
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
            'top': scrollY + 'px'
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
     * @param  {Object=} type      Optionally pass the type of the viewport (window or element)
     *
     * @returns {Object} An object of helper functions to be used the main handler function to be fire.
     */
    ParallaxScrolling.prototype.init = function (ele, container, eleHeight, viewableHeight, viewport, type) {
        // Default to the current window if it hasn't been passed through to the helper
        viewport = viewport || window;
        type = type || 'window';

        var $this = this,
            offsetTop = this._offset(container).y,
            percentage = 0.5,
            scrollProgress,
            scrollPosition,
            visibleHeight = viewableHeight - (viewableHeight * (1 - percentage));

        this._container = container;

        return {
            /**
             * A handler in which to fire when scrolling.
             * Allows passing a new window viewport through the handler and the offset of the container.
             *
             * @param  {Object?} overrideViewport A new window object to be used (useful for iFrame neseting).
             * @param  {Object?} overrideOffset Manually override the offset of the container (iframe nesting again).
             *
             * @returns {Number} The scrollY position of the what the element should be.
             */
            handler: function (overrideViewport, overrideOffset, overrideType) {
                overrideViewport = overrideViewport || viewport;
                overrideOffset = overrideOffset || offsetTop;
                overrideType = overrideType || type;

                scrollPosition = $this._getScrollPosition({
                    eleHeight: eleHeight,
                    offsetTop: overrideOffset,
                    visibleHeight: visibleHeight,
                    winPosition: $this._getWindowPositions(overrideViewport, overrideType)
                });

                $this._setElePosition(ele, scrollPosition.scrollY);
                $this._scrollPercentTriggers(ele, (1 - scrollPosition.scrollProgress) * 100);

                return scrollPosition.scrollY;
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
            }
        };
    };

    return ParallaxScrolling;
});
