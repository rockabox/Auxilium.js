define([
    'aux/events',
    'aux/is-defined'
], function (Events, isDefined) {

    /**
     * A module to attach different touch events to an element.
     * @exports touch
     *
     * @requires module:events
     */
    function Touch (options) {
        this.events = new Events();
        this.touchStart = false;
        this.touchSwipe = false;
        this.cachedX = 0;
        this.cachedY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.touchStartTime = 0;

        // Sets the thresholds of interaction types
        this.tapLength = options.tapLength || 200;
        this.swipeDistance = options.swipeDistance || 30;
    }

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
        this.events.addListeners(ele, 'touchend click', this._touchTapHandler(callback));
    };

    /**
     * Setup a swipe event allowing for an event to fire when a swipe has occured on an element, with an optional adding
     * of a tap / click event to an element.
     * NOTE: Allows for, left, right, up and down (multiple can be added using spaces)
     * @memberOf module:touch
     *
     * @public
     * @param  {Object}   ele       The element in which to add the swipe event
     * @param  {Function} callback  When swipe event has occured
     * @param  {String}   direction The direction(s) in which to fire the event
     * @param  {Boolean}  tap       Whether or not to set a tap event also (swipe and tap)
     *
     * @example
     * No Tap:
     * ```js
     * var touch = new Touch(),
     * 	ele = document.createElement('div');
     *
     * touch.swipe(ele, function () {
     * 	console.log('I have been tapped');
     * }, 'left right');
     * // When swiping (in either a left or right direction) on the div element it will fire the console log
     * ```
     * With Tap:
     * ```js
     * var touch = new Touch(),
     * 	ele = document.createElement('div');
     *
     * touch.swipe(ele, function () {
     * 	console.log('I have been tapped');
     * }, 'up', true);
     * // When swiping up on the div element it will fire the console log
     * // When clicking (or tapping) on the div element it will also fire the console log
     * ```
     */
    Touch.prototype.swipe = function (ele, callback, direction, tap) {
        var $this = this;

        // When we want tap and swipe set up the tap handler
        if (tap) {
            $this.tap(ele, callback);
        } else {
            this.events.addListeners(ele, 'touchstart', this._touchStartHandler());
        }
        // Prevent the default to happen when touchmove is fired
        this.events.addListeners(ele, 'touchmove', function (event, data) {
            $this._preventDefault(data);
            // We should be checking for swipe (we've started to move)
            $this.touchSwipe = true;
        });
        this.events.addListeners(ele, 'touchend', this._touchSwipeHandler(direction, callback));
    };

    /**
     * Check if touch has moved position to determine tap.
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is the same.
     */
    Touch.prototype._isTap = function () {
        return (this.cachedX === this.currentX) && (this.cachedY === this.currentY) && !this.touchStart;
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
        this.touchStart = this.touchSwipe = false;
        this.cachedX = this.cachedY = this.currentX = this.currentY = $this.touchStartTime = 0;
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
            $this.touchStartTime = new Date.getTime();

            // if (data.type === 'touchstart' && isDefined(callback, 'function')) {
            //     setTimeout(function () {
            //         if ($this._isTap()) {
            //             callback(event, data);
            //             $this._reset();
            //         }
            //     }, this.tapLength);
            // }
        };
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
    Touch.prototype._touchTapHandler = function (callback) {
        var $this = this;
        return function (event) {
            // Check if we're in a swipe (we've moved)
            if ($this.touchSwipe) {
                return;
            }

            console.log(new Date.getTime());
            console.log($this.touchStartTime);
            if ($this._isTap()) {
                callback(event, data);
                $this._reset();
            }

            $this._preventDefault(event);

            if (event.type === 'click') {
                callback(event);
            }

            $this._reset();
        };
    };

    /**
     * Touch event handler which is called on a touch move event.
     * @memeberOf module:touch
     *
     * @protected
     * @param {String}   direction The direction in which to fire the callback
     * @param {Function} callback  A function in which to call once a swipe has been made
     */
    Touch.prototype._touchSwipeHandler = function (direction, callback) {
        var $this = this;

        return function (event, data) {
            if (!$this.cachedX || !$this.cachedY) {
                return;
            }

            var touch = data.changedTouches.length ? data.changedTouches[0] : data,
                threshold = this.swipeDistance,
                xUp = touch.pageX,
                yUp = touch.pageY,
                xDiff = $this.cachedX - xUp,
                yDiff = $this.cachedY - yUp,
                swiped,
                distanceX = Math.abs(touch.pageX - $this.cachedX),
                distanceY = Math.abs(touch.pageY - $this.cachedY);

            // Ensure that the swipe has met the threshold for a "swipe"
            if ((threshold > distanceX) && (threshold > distanceY)) {
                return;
            }

            // Check which direction the move was made
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    swiped = 'left';
                } else {
                    swiped = 'right';
                }
            } else {
                if (yDiff > 0) {
                    swiped = 'up';
                } else {
                    swiped = 'down';
                }
            }

            $this._reset();

            if (direction.indexOf(swiped) > -1) {
                callback();
            }
        };
    };

    return Touch;
});
