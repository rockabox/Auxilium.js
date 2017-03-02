define([
], function () {
    /**
     * Serialize's an object into query params for a URL
     * Passes & between params (? or & not prefixed)
     *
     * @exports serialize
     *
     * @param  {object} queryParams The different params to serialize (key becomes &param value becomes =value)
     *
     * @return {string}        Passes back a serialized version from the object ready to be used for a URL
     *
     * @example
     * ```js
     * var queryParams = {
     * 	'first_name': 'Bart',
     *  'last_name': 'Simpson'
     * };
     * serialize(queryParams);
     * // returns
     * // first_name=Bart&last_name=Simpson
     * ```
     */
    function serialize (queryParams) {
        var str = [],
            key,
            value,
            query;

        for (query in queryParams) {
            var param = queryParams[query];

            if (queryParams.hasOwnProperty(query) && (param || param === 0)) {
                key = encodeURIComponent(query);
                value = encodeURIComponent(param);
                str.push(key + '=' + value);
            }
        }

        return str.join('&');
    }

    return serialize;
});
