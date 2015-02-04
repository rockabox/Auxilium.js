/**
 * Clones an object, returning a new instance of the object passed.
 * @module aux/clone
 */
define([
], function () {
    /**
     * Clones an object, returning a new instance of the object passed.
     *
     * @memberOf module:aux/clone
     *
     * @param  {object} obj The base object which to make a fresh copy of
     * @return {object}     A fresh instance of the object originally passed
     */
    function clone (obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }

        return temp;
    }

    return clone;
});
