define([
    'aux/events'
], function (Events) {

    /**
     * A module to attach different touch events to an element.
     * @exports touch
     *
     * @requires module:events
     */
    function Touch () {
        this.events = new Events();
        this.touchStart = false;
        this.cachedX = 0;
        this.cachedY = 0;
        this.currentX = 0;
        this.currentY = 0;
    }

    /**
     * Check if touch has moved position to determine tap.
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is the same.
     */
    Touch.prototype._isTap = function () {
        return (this.cachedX === this.currentX) &&
            (this.cachedY === this.currentY) && !this.touchStart;
    };

    /**
     * A helper function to prevent any defaults on a given event
     * @memberOf module:touch
     *
     * @protected
     * @param {Object} event An event object passed from the browser such as mouseover or click
     */
    Touch.prototype._preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
    };

    /**
     * Reset touch event variables
     * @memberOf module:touch
     *
     * @protected
     */
    Touch.prototype._reset = function () {
        this.touchStart = false;
        this.cachedX = this.cachedY = this.currentX = this.currentY = 0;
    };

    /**
     * Touch event handler which will callback if tap is detected.
     * @memberOf module:touch
     *
     * @protected
     * @param {Function} callback When tap event has occurred
     * @return {Function} Function for touch event handling
     */
    Touch.prototype._touchStartHandler = function (callback) {
        var $this = this;
        return function (event, data) {
            $this._preventDefault(data);

            var touch = data.touches.length ? data.touches[0] : data;
            $this.touchStart = true;
            $this.cachedX = $this.currentX = touch.pageX;
            $this.cachedY = $this.currentY = touch.pageY;

            if (data.type === 'touchstart') {
                setTimeout(function () {
                    if ($this._isTap()) {
                        callback(event, data);
                        $this._reset();
                    }
                }, 200);
            }
        };
    };

    /**
     * Setup a tap event allowing for both tap or clicking on an element.
     * @memberOf module:touch
     *
     * @public
     * @param {Object} ele Node element to attach touch events to
     * @param {Function} callback When tap event has occurred
     *
     * @example
     * ```js
     * var touch = new Touch(),
     * 	ele = document.createElement('div');
     *
     * touch.tap(ele, function () {
     * 	console.log('I have been tapped');
     * });
     * // When tapping on the div element if will fire the console log
     * // When clicking on the div element it will also fire the console log
     * ```
     */
    Touch.prototype.tap = function (ele, callback) {
        this.events.addListeners(ele, 'touchstart', this._touchStartHandler(callback));
        this.events.addListeners(ele, 'touchend click', this._touchEndHandler(callback));
    };

    /**
     * Touch event handler which is called on touch end. Will automatically fire call on click for
     * desktop browsers.
     * @memberOf module:touch
     *
     * @protected
     * @param {Function} callback When a click event has occurred
     * @return {Function} Function for touch event handling
     */
    Touch.prototype._touchEndHandler = function (callback) {
        var $this = this;
        return function (event) {
            $this._preventDefault(event);

            if (event.type === 'click') {
                callback(event);
            }

            $this._reset();
        };
    };

    return Touch;
});
