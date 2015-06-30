define([
    'aux/create-element'
], function (createElement) {

    /**
     * Gets information from about a url. Domain, Port, Protocol etc.
     *
     * @exports get-url-info
     *
     * @param  {String} url The URL in which to check
     * @return {Object} info The information about the URL within an Object
     * @property {string} info.hash The part of the url that is hashed (#someValue)
     * @property {string} info.host The domain with the port attached
     * @property {string} info.hostname The domain with no port or protocol
     * @property {string} info.href The original URL passed to the function
     * @property {string} info.pathname The path of the url (/search)
     * @property {string} info.port The portnumber of the url (912) - can be blank if none specified
     * @property {string} info.protocol The protocol of the url (http: or https:)
     * @property {string} info.search The query paramaters of the url (?a=foo&b=bar)
     *
     * @example
     * ```js
     * var info = getUrlInfo('https://www.some-example.com:912/my-page?a=foo&b=bar#somehash');
     * // Returns
     * {
     * 	hash: '#somehash',
     * 	host: 'www.some-example.com:912',
     * 	hostname: 'www.some-example.com',
     * 	href: 'https://www.some-example.com:912/my-page?a=foo&b=bar#somehash',
     * 	pathname: '/my-page',
     * 	port: '912',
     * 	protocol: 'https:',
     * 	search: '?a=foo&b=bar'
     * }
     * ```
     */
    function getUrlInfo (url) {
        if (url) {
            return;
        }

        var linkInfo;

        if (url.indexOf('//') === 0) {
            // Check if the url is protocoless and if so attach a protocol on in order to get all of the information
            url = 'http:' + url;
        } else if (url.indexOf('http') === -1) {
            // Ensure that the url contains a protocol otherwise it will not be possible to get all of the information
            url = 'http://' + url;
        }

        try {
            // Try to use the built in browser URL functions
            linkInfo = new window.URL(url);
        } catch (error) {
            // When there is an error create an element in order to get the information (URL most likely not avaialbe
            // in current browser)
            var ele = createElement('a', {
                attr: {
                    'href': url
                }
            });

            linkInfo = {
                'hash': ele.hash,
                'host': ele.host,
                'hostname': ele.hostname,
                'href': ele.href,
                'pathname': ele.pathname,
                'port': ele.port,
                'protocol': ele.protocol,
                'search': ele.search
            };

            // Remove the element so that we do not keep the element in memory
            ele = null;
        }

        return linkInfo;
    }

    return getUrlInfo;
});
