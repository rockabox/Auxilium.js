define([
], function () {

    /**
     * Creates a throttled function that only invokes `action` at most once per every `wait` milliseconds
     * @exports throttle
     *
     * @param {Function} action The function to throttle.
     * @param {number} wait  The number of milliseconds to throttle
     */
    function throttle (action, wait) {
        var lastArgs,
            lastThis,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0;

        wait = wait || 0;

        function invokeAction (time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;

            action.apply(thisArg, args);
        }

        function invokeFirst (time) {
            lastInvokeTime = time;

            // Start the timer to invoke last to be fired.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the first `action`
            return invokeAction(time);
        }

        function shouldInvoke (time) {
            var timeSinceLastCall = time - lastCallTime;

            return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0));
        }

        function remainingWait (time) {
            var timeSinceLastCall = time - lastCallTime,
                remaining = wait - timeSinceLastCall;

            return remaining;
        }

        function timerExpired () {
            var time = new Date().getTime();

            if (shouldInvoke(time)) {
                return invokeLast(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function invokeLast (time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (lastArgs) {
                lastArgs = lastThis = undefined;
                return invokeAction(time);
            }
        }

        function throttled () {
            var $this = this,
                time = new Date().getTime(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = $this;
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return invokeFirst(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
            }
        }

        return throttled;
    }

    return throttle;
});
