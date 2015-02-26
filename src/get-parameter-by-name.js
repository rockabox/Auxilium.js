define([
], function () {
    /**
     * Get a parameter from the URL
     * @exports get-parameter-by-name
     * @param  {string} url  The URL containing the params
     * @param  {string} name The name to get the param for
     *
     * @return {string}      Containing a decoded URI version of the param
     *
     * @example
     * ```js
     * var urlPath = 'http://www.example.com?id=921',
     * 	id = getParameterByName(urlPath, 'id');
     * // id is 921
     *
     * var name = getParameterByName(urlPath, 'name');
     * // name is ''
     * ```
     */
    function getParameterByName (url, name) {
        name = name.replace('/[\\[]/', '\\[').replace('/[\\]]/', '\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)',
            regex = new RegExp(regexS),
            results = regex.exec(url);

        if (results) {
            var host,
                result = results[1].replace(/\+/g, ' ');
            try {
                host = decodeURIComponent(result);
                return decodeURIComponent(host);
            } catch (error) {}
        }
        return '';
    }

    return getParameterByName;
});
