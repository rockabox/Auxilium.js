define([
    './is-defined'
], function (isDefined) {

    /**
     * Returns whether or not a value is within an array (IE8 helper)
     *
     * @module in-array
     *
     * @requires has-property
     *
     * @param  {Array} arr    The array in which to check contains a particular value.
     * @param  {*} value      The value in which to check the array contains.
     * @return {Boolean}      Whether or not the value is within the array.
     *
     * @example
     * ```js
     * var arr = [0, 9, 2];
     *
     * inArray(arr, 9);
     * // Returns true;
     *
     * inArray(arr, 1);
     * // Returns false;
     * ```
     */
    function inArray (arr, value) {
        if (isDefined(arr.indexOf, 'function')) {
            return (arr.indexOf(value) > -1);
        }

        var exists = false;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                // We have found the value break out of the for loop at set that the value exists.
                exists = true;
                break;
            }
        }

        return exists;
    }

    return inArray;
});
