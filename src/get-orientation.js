define([
    'aux/is-defined'
], function (isDefined) {

    /**
     * @exports get-orientation
     *
     * Checks what the current orientation of the window is, if the orienation isn't accessible (desktop)
     * will default to portrait.
     *
     * @param {Number} orientation The orientation of the device (will fallback to use window.orientation).
     *
     * @retuns {String} What the current orientation is (portrait or landscape).
     *
     * @example
     * ```js
     * getOrientation(90);
     * // Returns 'landscape'
     *
     * getOrientation(0);
     * // Returns 'portrait'
     *
     * getOrientation();
     * // Returns portrait (if no orientation can be found)
     * ```
     */
    function getOrientation (orientation) {
        orientation = orientation || window.orientation;
        // When we're serving in a non-mobile enviroment orientation is not set (default to portrait).
        if (!isDefined(orientation)) {
            return 'portrait';
        }

        if (orientation !== -90 && orientation !== 90) {
            return 'portrait';
        }

        return 'landscape';
    }

    return getOrientation;
});
