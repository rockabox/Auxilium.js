define([
], function () {

    /**
     * @exports generate-uuid
     * @description
     * Generate a UUID v4 in JavaScript
     *
     * @returns {String} A random generated uuid
     *
     * @example
     * ```js
     * var uuid = generateUUID();
     * // Returns 110ec58a-a0f2-4ac4-8393-c866d813b8d1
     * ```
     */
    function generateUUID () {
        var time = new Date().getTime();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    return generateUUID;
});
