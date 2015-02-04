/**
 * A module which merge's two objects together (destructively to the first obj).
 * @module aux/merge
 */
define([
], function () {
    /**
     * Combines two objects where the values on the
     * first object is replaced. Will modify the first object!
     *
     * @memberOf module:utils.merge
     *
     * @public
     * @param  {object} obj1 Base object which will be updated
     * @param  {object} obj2 Extra values
     * @return {object}      Merged object
     */
    function merge (obj1, obj2) {
        for (var p in obj2) {
            if (obj2.hasOwnProperty(p)) {
                try {
                    if (obj2[p].constructor === Object) {
                        obj1[p] = merge(obj1[p], obj2[p]);
                    } else {
                        obj1[p] = obj2[p];
                    }
                } catch (e) {
                    obj1[p] = obj2[p];
                }
            }
        }

        return obj1;
    }

    return merge;
});
