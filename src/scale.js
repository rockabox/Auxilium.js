define([
    'aux/events'
], function (Events) {
    /**
     * @exports scale
     *
     * Scale an element to fit the window
     *
     * @requires module:events
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
            init: function (node, width, height) {
                var handler = this._scaleHandler(node, width, height);

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
             * @param {Object} node Element to apply scale to
             * @param {Number} width Creative width
             * @param {Number} height Creative height
             * @return {Function} Event handler
             */
            _scaleHandler: function (node, width, height) {
                return function (event) {
                    var ratio = 1;

                    if ((width >= height) && (width >= window.innerWidth)) {
                        ratio = window.innerWidth / width;
                    } else if ((height >= width) && (height >= window.innerHeight)) {
                        ratio = window.innerHeight / height;
                    }

                    node.style.zoom = ratio;
                };
            }
        };
    }

    return Scale;
});
