define([
], function () {

    /**
     * Helper for use the requestAnimationFrame function (along with cancelling). Some older browsers that we still
     * support require prefixes therefore this helper acts as a helper for determining which one to use.
     *
     * @exports get-animation-frame
     *
     * @public
     */
    function getAnimationFrame (win) {
        win = win || window;

        var obj = {
                request: win.requestAnimationFrame,
                cancel: win.cancelAnimationFrame || win.cancelRequestAnimationFrame
            },
            methods = {
                request: 'requestAnimationFrame',
                cancel: 'cancelAnimationFrame'
            },
            vendors = ['ms', 'moz', 'webkit', 'o'];

        // Loop through the list of vendors if the basic non-vendor function doesn't already exist.
        for (var x = 0; x < vendors.length && !obj.request; ++x) {
            var vendor = vendors[x],
                request = vendor + 'RequestAnimationFrame',
                cancel = vendor + 'CancelAnimationFrame';

            obj.request = win[request];
            methods.request = request;

            if (win[cancel]) {
                obj.cancel = win[cancel];
                methods.cancel = cancel;
            } else {
                cancel = vendor + 'CancelRequestAnimationFrame';
                obj.cancel = win[cancel];
                methods.cancel = cancel;
            }
        }

        return methods;
    }

    return getAnimationFrame;
});
