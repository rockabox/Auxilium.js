define([
], function () {
    /**
     * Checks whether an object has the given properties
     *
     * @exports has-property
     *
     * @param {Object} obj Object to check
     * @param {String} path Properties to check
     *
     * @return {Boolean} True if the given object contains the properties
     *
     * @example
     * ```js
     * var testObj = {
     * 		'cartoons': {
     * 			'simpsons': {
     * 				'Barney': 'I am here!'
     * 			}
     * 		}
     * };
     *
     * // Returns true (that Barney key exists on the simpons object key).
     * hasProperty(testObj, 'cartoons.simpsons.Barney');
     *
     * // Returns false (that Ash key does not exist on the simpons object key).
     * hasProperty(testObj, 'cartoons.simpsons.Ash');
     * ```
     */
    function hasProperty (obj, path) {
        var args = path.split('.');

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }

        return true;
    }

    return hasProperty;
});
