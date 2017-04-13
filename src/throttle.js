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
     *     throttled = new Throttle(action,1500);
     *
     * window.addEventListener('scroll', function () {
     *     throttle.invoke();
     * });
     * ```
     */
    function Throttle (action, wait) {
        this.lastArgs = null;
        this.lastThis = null;
        this.timerId = null;
        this.lastInvokeTime = 0;
        this.action = action;
        this.wait = wait || 0;
    }

    /**
     * Returns a numeric value date as the number of milliseconds
     *
     * @private
     * @return {Object} The current time
     */
    Throttle.prototype._now = function () {
        return new Date().getTime();
    };

    /**
     * Invokes `action` function with passed arguments
     *
     * @private
     * @param {number} time The timestamp of invoke.
     */
    Throttle.prototype._invokeAction = function (time) {
        var args = this.lastArgs,
            thisArg = this.lastThis;

        this.lastArgs = null;
        this.lastThis = null;
        this.lastInvokeTime = time;

        this.action.apply(thisArg, args);
    };

    /**
     * Starts the timer to control when fire last one
     * and invokes the `action`
     *
     * @private
     * @param {number} time The timestamp of invoke.
     */
    Throttle.prototype._invokeFirst = function (time) {
        // Start the timer to invoke last to be fired.
        this.timerId = setTimeout(this._timerExpired.bind(this), this.wait);
        // Invoke the first `action`
        return this._invokeAction(time);
    };

    /**
     * Checks it hasn't fired the action yet (First time)
     * or if the time since last time fired is bigger than waiting time
     *
     * @private
     * @param {number} time The timestamp of invoke.
     */
    Throttle.prototype._shouldInvoke = function (time) {
        var timeSinceLastInvoke;

        // if `lastInvokeTime` is different than 0 it needs to check time since last invoke.
        if (this.lastInvokeTime) {
            timeSinceLastInvoke = time - this.lastInvokeTime;
            return (timeSinceLastInvoke >= this.wait);
        }
        // if is the first call `lastInvokeTime` will be 0 and it should invoke.
        return true;
    };

    /**
     * Return the remaining time to the be able to fire action
     * Total time it has to wait minus the time it has already waited.
     *
     * @private
     * @param {number} time The timestamp of invoke.
     */
    Throttle.prototype._remainingWait = function (time) {
        var timeSinceLastInvoke;

        if (!this.lastInvokeTime) {
            return 0;
        }

        timeSinceLastInvoke = time - this.lastInvokeTime;
        remaining = this.wait - timeSinceLastInvoke;

        return remaining;
    };

    /**
     * Invokes last call method to fire last action and restarts the timer.
     *
     * @private
     */
    Throttle.prototype._timerExpired = function () {
        var time = this._now(),
            canInvoke = this._shouldInvoke(time);

        if (canInvoke) {
            return this._invokeLast(time);
        }
        // Restart the timer.
        this.timerId = setTimeout(this._timerExpired.bind(this), this._remainingWait(time));
    };

    /**
     * Fires the last action with the last time stamp
     * and reset timerId, lastArgs, and lastThis to null.
     *
     * @private
     * @param {number} time The timestamp of invoke.
     */
    Throttle.prototype._invokeLast = function (time) {
        this.timerId = null;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (this.lastArgs) {
            this.lastArgs = null;
            this.lastThis = null;
            return this._invokeAction(time);
        }
    };

    /**
     * Invokes `action` function if is the first time calling
     * or if the time passed since the last one is bigger
     * than the `wait` time.
     *
     * @public
     */
    Throttle.prototype.invoke = function () {
        var time = this._now(),
            canInvoke = this._shouldInvoke(time);

        this.lastArgs = arguments;
        this.lastThis = this;

        if (canInvoke) {
            if (!this.timerId) {
                return this._invokeFirst(time);
            }
            this.timerId = setTimeout(this._timerExpired.bind(this), this.wait);
            return this._invokeAction(time);
        }
        if (!this.timerId) {
            this.timerId = setTimeout(this._timerExpired.bind(this), this.wait);
        }
    };

    return Throttle;
});
