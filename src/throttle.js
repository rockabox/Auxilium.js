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
     * var action = function () { console.log('Action to fire');};
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
            lastInvokeTime;

        wait = wait || 0;

        /**
         * Invokes `action` function with passed arguments
         *
         * @param {number} time The timestamp of invoke.
         */
        function invokeAction (time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = null;
            lastThis = null;
            lastInvokeTime = time;

            action.apply(thisArg, args);
        }

        /**
         * Starts the timer to control when fire last one
         * and invokes the `action`
         *
         * @param {number} time The timestamp of invoke.
         */
        function invokeFirst (time) {
            // Start the timer to invoke last to be fired.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the first `action`
            return invokeAction(time);
        }

        /**
         * Checks it hasn't fired the action yet (First time)
         * or if the time since last time fired is bigger than waiting time
         *
         * @param {number} time The timestamp of invoke.
         */
        function shouldInvoke (time) {
            var timeSinceLastInvoke = time - lastInvokeTime;

            return (
                (typeof lastInvokeTime === 'undefined') || (timeSinceLastInvoke >= wait) || (timeSinceLastInvoke < 0)
            );
        }

        /**
         * Return the remaining time to the be able to fire action
         * Total time it has to wait minus the time it has already waited.
         *
         * @param {number} time The timestamp of invoke.
         */
        function remainingWait (time) {
            var timeSinceLastInvoke = time - lastInvokeTime,
                remaining = wait - timeSinceLastInvoke;

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
         * @param {number} time The timestamp of invoke.
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
                canInvoke = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = $this;

            if (canInvoke) {
                if (!timerId) {
                    return invokeFirst(time);
                }
                timerId = setTimeout(timerExpired, wait);
                return invokeAction(time);
            }
            if (!timerId) {
                timerId = setTimeout(timerExpired, wait);
            }
        }

        return throttled;
    }

    return throttle;
});
