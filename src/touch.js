define([
    'aux/events'
], function (Events) {

    /**
     * A module to attach different touch events to an element.
     * @exports touch
     *
     * @requires module:events
     */
    function Touch (options) {
        this.events = new Events();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touch = false;
        // Sets the thresholds of interaction types
        this.swipeDistance = 10;
    }

    /**
     * Check if touch has moved position to determine tap.
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is the same.
     */
    Touch.prototype._isTap = function (posX, posY) {
        return (this.touchStartX === posX) && (this.touchStartY === posY);
    };
    /**
     * Check if touch has moved position to determine swipe.
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is different and the difference is bigger than threshold.
     */
    Touch.prototype._isSwipe = function (distanceX, distanceY) {
        return ((this.swipeDistance < distanceX) || (this.swipeDistance < distanceY));
    };

    /**
     * Returns pointer horizontal and vertical postion
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is the same.
     */
    Touch.prototype._getCords = function (event) {
        if (event.changedTouches && event.changedTouches.length) {
            return {
                x: event.changedTouches[0].pageX,
                y: event.changedTouches[0].pageY
            };
        } else {
            return {
                x: event.pageX,
                y: event.pageY
            };
        }
    };

    /**
     * Returns pointer horizontal and vertical postion
     * @memberOf module:touch
     *
     * @protected
     * @return {Boolean} True if position is the same.
     */
    Touch.prototype._getDirection = function (distanceX, distanceY, diffX, diffY) {
        var swiped;
        if (distanceX > distanceY) {
            if (diffX > 0) {
                swiped = 'left';
            } else {
                swiped = 'right';
            }
        } else {
            if (diffY > 0) {
                swiped = 'up';
            } else {
                swiped = 'down';
            }
        }
        return swiped;
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
        this.events.addListeners(ele, 'touchstart', this._touchStartHandler());
        this.events.addListeners(ele, 'touchend click', this._endTouchHandler(callback));
    };

    /**
     * Setup a swipe event allowing for an event to fire when a swipe has occured on an element
     * NOTE: Allows for, left, right, up and down (multiple can be added using spaces)
     * @memberOf module:touch
     *
     * @public
     * @param  {Object}   ele       The element in which to add the swipe event
     * @param  {Function} callback  When swipe event has occured
     * @param  {String}   direction The direction(s) in which to fire the event
     *
     * @example
     * ```js
     * var touch = new Touch(),
     * 	ele = document.createElement('div');
     *
     * touch.swipe(ele, function () {
     * 	console.log('I have been swipe left');
     * }, 'left right');
     * // When swiping (in either a left or right direction) on the div element it will fire the console log
     * ```
     */
    Touch.prototype.swipe = function (ele, callback, direction) {
        this.events.addListeners(ele, 'touchstart', this._touchStartHandler());
        this.events.addListeners(ele, 'touchend', this._endTouchHandler(callback, direction, true));
    };

    /**
     * Touch event handler which is called on touch start and movedown.
     * @memberOf module:touch
     *
     * @protected
     * @return {Function} Function for touch event handling
     */
    Touch.prototype._touchStartHandler = function () {
        var $this = this;
        return function (event, data) {
            var cords = $this._getCords(data);
            $this.touchStart = true;
            $this.touchStartX = cords['x'];
            $this.touchStartY = cords['y'];
            $this.touch = true;
        };
    };

    /**
     * Touch event handler which is called on touch end and move up.
     * @memberOf module:touch
     *
     * @protected
     * @param {Function} callback When a click, tap, swipe event has occurred
     * @return {Function} Function for touch event handling
     */
    Touch.prototype._endTouchHandler = function (callback, direction, swipe) {
        var $this = this;
        return function (event, data) {
            var cords = $this._getCords(data),
                threshold = $this.swipeDistance,
                diffX,
                diffY,
                distanceX,
                distanceY;

            diffX = $this.touchStartX - cords['x'];
            diffY =  $this.touchStartY - cords['y'];
            distanceX = Math.abs(diffX);
            distanceY = Math.abs(diffY);

            if ($this.touch && event.type === 'click') {
                return;
            }

            if (!swipe && $this._isTap(cords['x'], cords['y']) || event.type === 'click') {
                callback(event, data);
            } else if (swipe && $this._isSwipe(distanceX, distanceY)) {
                if (direction.indexOf($this._getDirection(distanceX, distanceY, diffX, diffY)) > -1) {
                    callback();
                }
            }
        };
    };

    return Touch;
});
