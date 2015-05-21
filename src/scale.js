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
             * @param {Object} window Window object that we will resize to
             * @param {Object} node Element to apply scale to
             * @param {Number} width The elements max-width
             * @param {Number} height The elements max-height
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
            init: function (window, node, width, height) {
                var handler = this._scaleHandler(window, node, width, height);

                events.addListener(window, 'scroll', handler);
                events.addListener(window, 'resize', handler);

                handler();
            },
            /**
             * Returns a function to be used for listening to events.
             *
             * @memberOf module:scale
             *
             * @protected
             * @param {Object} window Window object that we will resize to
             * @param {Object} node Element to apply scale to
             * @param {Number} width Creative width
             * @param {Number} height Creative height
             * @return {Function} Event handler
             */
            _scaleHandler: function (window, node, width, height) {
                return function (event) {
                    var ratio = 1;

                    if ((width >= height) && (width >= window.innerWidth)) {
                        ratio = window.innerWidth / width;
                    } else if ((height >= width) && (height >= window.innerHeight)) {
                        ratio = window.innerHeight / height;
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
                };
            }
        };
    }

    return Scale;
});
