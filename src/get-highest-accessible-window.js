define([
], function () {

    var parent;

    /**
     * Get the highest accessible window
     *
     * @exports get-highest-accessible-window
     * @public
     * @param {object=} win The window in which to get the parent of (defaults to current window)
     * @return {object} Accessible window object
     *
     * @example
     * ```js
     * var topWindow = false,
     * 	win = {
     * 		top: topWindow,
     *  	parent: {
     *  		document: {
     *  			domain: 'this'
     *  		}
     *  	}
     * };
     * getHighestAccessibleWindow(win);
     * // Will return the window (parent win.parent), as we do not have access to the top window
     * ```
     */
    function getHighestAccessibleWindow (win) {
        win = win || window;

        // Check to see if we have access to the top level window
        try {
            if (win.top.document && win.top.document.domain) {
                return win.top;
            }
        } catch (error) {}

        // Climb the windows current parents and get the highest most possible window in which we have access
        climbParents(win);

        return parent;
    }

    /**
     * Climb the parents and set the parent when found an accessible parent (calls self whilst the parent window is not
     * the top window).
     * @memberOf module:get-highest-accessible-window
     *
     * @private
     * @param {object} win The window in which to get the parent of (defaults to current window)
     * @return {object} Accessible window object
     */
    function climbParents (win) {
        try {
            // Check when we have hit the top and return the highest parent found
            if (win.parent === win.top) {
                return parent;
            }
            // Check if we have access to the current parent
            if (win.parent.document && win.parent.document.domain) {
                parent = win.parent;
            }

            // Call self (in order to climb up to the next parent)
            climbParents(win.parent);
        } catch (error) {
            // When an error occurs continue climbing up until we hit the top window
            climbParents(win.parent);
        }
    }

    return getHighestAccessibleWindow;
});
