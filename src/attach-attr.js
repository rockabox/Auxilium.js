define([
], function () {
    /**
     * A module which attaches DOM attribles to an element.
     *
     * @exports attach-attr
     *
     * @param {object} ele    A DOM Element in which to add the CSS to.
     * @param {object} attrs Attributes in which to add to the Element in an object
     * @returns {object} ele  Passes the element with attributes attached.
     *
     * @example
     * ```js
     * var imgEle = document.createElement('img'),
     * 		attr = {
     * 			'src': 'http://example.com/something.gif',
     *    		'width': '100',
     *    		'height': '200'
     *   	};
     *
     * attachAttr(imgEle, attr);
     *
     * // Returns imgEle (<img src="http://example.com/something.gif" width="100" height="200" />)
     * ```
     */
    function attachAttr (ele, attrs) {
        if (!attrs) {
            return ele;
        }

        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                ele.setAttribute(attr, attrs[attr]);
            }
        }

        return ele;
    }

    return attachAttr;
});
