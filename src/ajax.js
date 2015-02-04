/**
 * A module to allow for cross-browser AJAX calls
 * @module aux/ajax
 */
define([
], function () {

    function Ajax () {}

    Ajax.prototype = {
        /**
         * Execute ajax request
         *
         * @memberOf module:aux/ajax
         *
         * @param {string} url Location of json file
         * @param {string} method Defaults to get
         * @param {function} onload Success callback
         * @param {function} onerror Error callback
         *
         * @returns {object} XMLHTTP request object
         */
        load: function (url, method, onload, onerror) {
            var $this = this,
                xhr = $this.getRequest();

            if (xhr) {
                method = method ? method : 'get';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (onload) {
                                onload(xhr);
                            }
                        } else {
                            if (onerror) {
                                onerror(xhr);
                            }
                        }
                    }
                };
                xhr.open(method, url, true);
                xhr.send(null);
            }
            return xhr;
        },
        /**
         * Retrieves the correct XMLHTTP object
         *
         * @memberOf module:aux/ajax
         *
         * @returns {object} XMLHTTP request object
         */
        getRequest: function () {
            var xhr = false;
            if (typeof ActiveXObject !== 'undefined') {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (err) {
                        xhr = false;
                    }
                }
            } else if (window.XMLHttpRequest) {
                try {
                    xhr = new XMLHttpRequest();
                } catch (e) {
                    xhr = false;
                }
            }
            return xhr;
        },
        /**
         * Exactly the same as load but will parse the response
         * into a JSON object.
         *
         * @memberOf module:aux/ajax
         *
         * @param {string} url Location of json file
         * @param {string} method Defaults to get
         * @param {function} onload Success callback
         * @param {function} onerror Error callback
         *
         * @returns {object} XMLHTTP request object
         */
        loadJson: function (url, method, onload, onerror) {
            var $this = this;

            return $this.load(url, method, function (xhr) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    onload(response);
                } catch (error) {
                    if (onerror) {
                        onerror(error);
                    }
                }
            }, onerror);
        }
    };

    return Ajax;
});
