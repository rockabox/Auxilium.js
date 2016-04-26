define([
    'aux/ajax'
], function (Ajax) {

    /**
     * A module to perform several AJAX calls
     * @exports multi-ajax
     */

    function MultiAjax () {
        this._ajax = new Ajax();
    }

    /**
     * Return a function that can be used as a callback for the Json loading requests.
     *
     * @memberOf module:multi-ajax
     * @protected
     *
     * @param {string[]} urls Location of json files
     * @param {integer} index Index of the url being processed
     * @param {string} method Defaults to get
     * @param {function} onload Success callback
     * @param {function} onerror Error callback
     * @param {Object[]} responses Partial response, array containing all the responses collected by previous requests
     */
    MultiAjax.prototype._loadJsonCallbackGenerator = function (urls, index, method, onload, onerror, responses) {
        var $this = this;
        return function (response) {
            responses.push(response);
            if (index < urls.length - 1) {
                $this._loadJson.call($this, urls, index + 1, method, onload, onerror, responses);
            } else {
                onload(responses);
            }
        };
    };

    /**
     * Request and parse a single Json object, using a generated callback to collect the response.
     *
     * @memberOf module:multi-ajax
     * @protected
     *
     * @param {string[]} urls Location of json files
     * @param {integer} index Index of the url being processed
     * @param {string} method Defaults to get
     * @param {function} onload Success callback
     * @param {function} onerror Error callback
     * @param {Object[]} responses Partial response, array containing all the responses collected by previous requests
     */
    MultiAjax.prototype._loadJson = function (urls, index, method, onload, onerror, responses) {
        this._ajax.loadJson(
            urls[index],
            method,
            this._loadJsonCallbackGenerator.call(this, urls, index, method, onload, onerror, responses),
            onerror
        );
    };

    /**
     * Execute several ajax requests parsing the responses into a list of JSON objects.
     *
     * @memberOf module:multi-ajax
     * @public
     *
     * @param {string[]} urls Location of json files
     * @param {string} method Defaults to get
     * @param {function} onload Success callback
     * @param {function} onerror Error callback
     */
    MultiAjax.prototype.loadJson = function (urls, method, onload, onerror) {
        this._loadJson.call(this, urls, 0, method, onload, onerror, []);
    };

    return MultiAjax;
});
