/**
 * A module that checks whether an object has the given properties.
 * @module utils/has-property
 */
define([], function () {
    /**
     * hasProperty
     * @memberOf module:utils/has-property
     * @param {Object} obj Object to check
     * @param {String} path Properties to check
     * @return {Boolean} True if the given object contains the properties
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
