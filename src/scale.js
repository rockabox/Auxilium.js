define([
    'aux/attach-css',
    'aux/events',
    'aux/is-css-property-supported'
], function (attachCss, Events, isCssPropertySupported) {
    /**
     * @exports scale
     *
     * Scale an element to fit the window
     *
     * @requires module:attach-css
     * @requires module:events
     * @requires module:is-css-property-supported
     */
    function Scale () {
        var events = new Events();

        return {
            /**
             * Will scale the element to the size of the window, ensuring that it doesn't exceed the max
             * width and height.
             *
             * @memberOf module:scale
             *
             * @public
             * @param {Object} win Window object that we will resize to
             * @param {Object} node Element to apply scale to
             * @param {Number} width The elements max-width
             * @param {Number} height The elements max-height
             * @param {Boolean} fullscreen Whether to scale to the fullscreen (going over the original width and height)
             *
             * @example
             * ```js
             * var htmlNode = document.createElement('div');
             * scale.init(htmlNode, 600, 400);
             *
             * // Will make the htmlNode element scale when scrolling or the window is resized to the
             * // size of the window with a max of 600px wide and 400px tall.
             * ```
             */
            init: function (win, node, width, height, fullscreen) {
                var handler = this._scaleHandler(win, node, width, height, fullscreen);

                events.addListener(win, 'scroll', handler);
                events.addListener(win, 'resize', handler);

                handler();
            },
            /**
             * Returns a function to be used for listening to events.
             *
             * @memberOf module:scale
             *
             * @protected
             * @param {Object} win Window object that we will resize to
             * @param {Object} node Element to apply scale to
             * @param {Number} width Node width
             * @param {Number} height Node height
             * @param {Boolean} fullscreen Whether to scale to the fullscreen (going over the original width and height)
             * @return {Function} Event handler
             */
            _scaleHandler: function (win, node, width, height, fullscreen) {
                return function (event) {
                    var _fullscreen = fullscreen || false,
                        ratio = 1,
                        widthRatio,
                        heightRatio;

                    // Check if either the width or the height is larger than the current viewport, if it is work out
                    // the ratio in which to use (using the smallest from either width or height).
                    if (width >= win.innerWidth || height >= win.innerHeight || _fullscreen) {
                        widthRatio = win.innerWidth / width;
                        heightRatio = win.innerHeight / height;
                        ratio = Math.min(widthRatio, heightRatio);
                    }

                    if (isCssPropertySupported('transform -webkit-transform')) {
                        var scale = 'scale(' + ratio + ')';
                        attachCss(node, {
                            transform: scale,
                            '-webkit-transform': scale
                        });
                    } else {
                        attachCss(node, {
                            'zoom': ratio
                        });
                    }

                    return ratio;
                };
            }
        };
    }

    return Scale;
});
