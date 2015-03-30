define([
    'aux/is-defined'
], function (isDefined) {
    /**
     * Clones an object or array.
     *
     * @exports clone
     *
     * @requires module:is-defined
     *
     * @param  {object} obj The base object which to make a fresh copy of
     *
     * @return {object}     A fresh instance of the object originally passed
     */
    function clone (obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = {};

        if (isDefined(obj, 'array')) {
            temp = [];
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }

        return temp;
    }

    return clone;
});
