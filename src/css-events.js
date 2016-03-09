define([
    'aux/events'
], function (Events) {
    /**
     * @constructor
     * @description
     * A module to add and remove CSS events to an element.
     *
     * @exports css-events
     */
    function cssEvents () {
        this.prefixes = [
            'webkit',
            'moz',
            'MS',
            'o',
            ''
        ];
    }

    /**
     * Attach CSS Events on to an element (cross browser for Chrome, Firefox, IE and Opera)
     *
     * - AnimationStart
     * - AnimationIteration
     * - AnimationEnd
     * - TransitionStart
     * - TransitionEnd
     *
     * @memberOf module:css-events
     *
     * @param {object} ele      The DOM Element in which to attach the CSS event handler to
     * @param {string} eventType Which type of css event to listen for.
     * @param {function} callback A function in which to trigger once the CSS animation / transition has been triggered
     *
     * @example
     * ```js
     * var cssEvents = new CssEvents();
     * cssEvents.addEvent('<div></div>', 'AnimationEnd', function () {
     * 	console.log('hi there');
     * });
     *
     * // The console log (hi there) will trigger once the Animation has ended.
     * ```
     */
    cssEvents.prototype.addEvent = function (ele, eventType, callback) {
        var prefixes = this.prefixes;

        // Loop through all prefixes in order to set them on to the element
        for (var i = 0; i < prefixes.length; i++) {
            if (!prefixes[i]) {
                eventType = eventType.toLowerCase();
            }

            // Attach listener on to element
            if (typeof ele.addEventListener === 'function') {
                ele.addEventListener(prefixes[i] + eventType, callback, false);
            }
        }
    };

    /**
     * Removes CSS Events on to an element (cross browser for Chrome, Firefox, IE and Opera)
     *
     * - AnimationStart
     * - AnimationIteration
     * - AnimationEnd
     * - TransitionStart
     * - TransitionEnd
     *
     * @memberOf module:css-events
     *
     * @param {object} ele      The DOM Element in which to attach the CSS event handler to
     * @param {string} eventType Which type of css event to listen for.
     * @param {function} callback The function in which to no longer trigger.
     *
     * @example
     * ```js
     * var cssEvents = new CssEvents();
     * cssEvents.removeEvent('<div></div>', 'AnimationEnd', function () {
     * 	console.log('hi there');
     * });
     *
     * // The original event that was listening to AnimationEnd in all browsers would be removed.
     * ```
     */
    cssEvents.prototype.removeEvent = function (ele, eventType, callback) {
        var prefixes = this.prefixes;

        // Loop through all prefixes in order to set them on to the element
        for (var i = 0; i < prefixes.length; i++) {
            if (!prefixes[i]) {
                eventType = eventType.toLowerCase();
            }

            // Attach listener on to element
            if (typeof ele.removeEventListener === 'function') {
                ele.removeEventListener(prefixes[i] + eventType, callback);
            }
        }
    };

    return cssEvents;
});
