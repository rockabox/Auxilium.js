define([
], function () {
    /**
     * A module which deals with handling errors (helper to throw error's).
     *
     * @exports error
     *
     * @param {string} message Error message
     */
    function error (message) {
        throw message;
    }

    return error;
});
