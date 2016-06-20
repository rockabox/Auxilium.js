define([
], function () {

    /**
     * @exports is-trusted
     *
     * Helper which checks whether an event is trusted or not.
     * More about trusted events here: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
     *
     * If a browser doesn't support `isTrusted` we fallback to `clientX` and `clientY` properties. X and Y have to be
     * greater than 0 to treat an event as trusted.
     * More about `clientX`: http://www.w3schools.com/jsref/event_clientx.asp
     *
     * @param {Event} event     The variable containing an event
     *
     * @returns {Boolean} When the event is not trusted it will pass back false otherwise pass back true.
     *
     * @example
     * ```js
     * isTrusted(MouseEvent);
     * // Returns true/false
     * ```
     */
    function isTrusted (event) {
        if ('isTrusted' in event) {
            return event.isTrusted;
        } else if (event.clientX > 0 && event.clientY > 0) {
            return true;
        }

        // A browser doesn't support `isTrused` and `clientX` and `clientY` equal to 0. Event not trusted
        return false;
    }

    return isTrusted;
});
