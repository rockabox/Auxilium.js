define([
], function () {

    /**
     * Creates a throttled function that only invokes `action` at most once per every `wait` milliseconds
     * @exports throttle
     *
     * @param {Function} action The function to throttle.
     * @param {number} wait  The number of milliseconds to throttle
     *
     * @example
     * ```js
     * var action = var action = function () { console.log('Action to fire');};
     *     throttled = throttle(action,1500);
     *
     * window.addEventListener('scroll', throttled);
     * ```
     */
    function throttle (action, wait) {
        var lastArgs,
            lastThis,
            result,
            timerId = null,
            lastCallTime;

        wait = wait || 0;

        /**
         * Invokes `action` function with passed arguments
         *
         * @param {number} time Time that has been fired
         */
        function invokeAction (time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = null;
            lastThis = null;

            action.apply(thisArg, args);
        }

        /**
         * Starts the timer to control when fire last one
         * and invokes the `action`
         *
         * @param {number} time Time that has been fired
         */
        function invokeFirst (time) {
            // Start the timer to invoke last to be fired.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the first `action`
            return invokeAction(time);
        }

        /**
         * Checks it hasn't fired the action yes (First time)
         * or if the time since last time fired is bigger than waiting time
         *
         * @param {number} time Time that has been fired
         */
        function shouldInvoke (time) {
            var timeSinceLastCall = time - lastCallTime;

            return ((typeof lastCallTime === 'undefined') || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0));
        }

        /**
         * Return the remaining time to the be able to fire action
         * Total time it has to wait minus the time it has already wait.
         *
         * @param {number} time Time that has been fired
         */
        function remainingWait (time) {
            var timeSinceLastCall = time - lastCallTime,
                remaining = wait - timeSinceLastCall;

            return remaining;
        }

        /**
         * Invokes last call method to fire last action and restarts the timer.
         */
        function timerExpired () {
            var time = new Date().getTime();

            if (shouldInvoke(time)) {
                return invokeLast(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        /**
         * Fires the last action with the last time stamp
         * and reset timerId, lastArgs, and lastThis to null.
         *
         * @param {number} time Time that has been fired
         */
        function invokeLast (time) {
            timerId = null;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (lastArgs) {
                lastArgs = null;
                lastThis = null;
                return invokeAction(time);
            }
        }

        /**
         * Fires `action` function if is the first time calling
         * or if the time passed since the last one is bigger
         * than the `wait` time.
         */
        function throttled () {
            var $this = this,
                time = new Date().getTime(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = $this;
            lastCallTime = time;

            if (isInvoking) {
                if (!timerId) {
                    return invokeFirst(lastCallTime);
                }
            }
            if (!timerId) {
                timerId = setTimeout(timerExpired, wait);
            }
        }

        return throttled;
    }

    return throttle;
});
