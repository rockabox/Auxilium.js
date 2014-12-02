define([], function () {
    /**
     * Attaches DOM attribles to an elements
     * @param {object} ele    A DOM Element in which to add the CSS to.
     * @param {object} attrs Attributes in which to add to the Element in an object
     * @returns {object} ele  Passes the element with attributes attached.
     *
     * @example
     *  var x = document.createElement('img'),
     * 		attr = {
     * 			'src': 'http://example.com/something.gif',
     *    		'width': '100',
     *    		'height': '200'
     *   	};
     *  // Returns x (<img src="http://example.com/something.gif" width="100" height="200" />)
     */
    function attachAttr (ele, attrs) {
        for (var attr in attrs) {
            ele.setAttribute(attr, attrs[attr]);
        }

        return ele;
    }

    return attachAttr;
});
