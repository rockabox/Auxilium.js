/**
 * A module which deals with handling errors (helper to throw error's).
 * @module aux/merge
 */
define([
], function () {
    /**
     * Throws an error message.
     *
     * @memberOf module:aux/error
     *
     * @public
     * @param {string} message Error message
     */
    function error (message) {
        throw message;
    }

    return error;
});
