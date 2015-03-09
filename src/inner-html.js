define([
    'aux/get-element-by-tag',
    'aux/create-element',
    'aux/validate-html'
], function (getElementByTag, createElement, validateHtml) {

    /**
     * @memberOf module:inner-html
     * @private
     *
     * @description
     * Replaces a node with a newely generated DOMNode (ideal for <script> tags when originally created by innerHTML).
     *
     * @param {Object} node The HTML DOMNode in which to replace with a created element
     *
     * @returns {Object} newNode The new generated DOMNode of the original node passed to the function
     */
    function recreateNode (node) {
        var manifest = {
                attr: {}
            },
            attributes = node.attributes,
            nodeType = node.tagName.toLowerCase(),
            newNode;

        // Loop through all of the attributes set to the existing node to ensure all are attached to the new node
        for (var attr = 0; attr < attributes.length; attr++) {
            var attibuteName = attributes[attr].nodeName;
            // Don't allow the use of an attribute with class force classname
            if (attibuteName === 'class') {
                manifest.cssNames = attributes[attr].nodeValue;
            } else {
                manifest.attr[attibuteName] = attributes[attr].nodeValue;
            }
        }

        // Create the new node
        newNode = createElement(nodeType, manifest);
        // Add any inner html back to the element
        newNode.innerHTML = node.innerHTML;

        node.parentNode.replaceChild(newNode, node);

        return newNode;
    }

    /**
     * @exports inner-html
     * @description
     * Attaches a string representation of a DOM to an element ensuring that a script tag is created rather than
     * simply using innerHTML to ensure it will be executable when attached to the DOM.
     * NOTE: When invalid HTML is passed to the function it will throw an error
     *
     * @requires module:validate-html
     * @requires module:create-element
     * @requires module:get-element-by-tag
     *
     * @param {Object} node The HTML DOMNode in which to attach the html to
     * @param {String} html The string representation of the DOM
     *
     * @returns {Object} node The HTML DOMNode with the string representation attached (inside).
     *
     * @example
     * ```js
     * var div = document.createElement('div');
     * div = innerHTML(div, '<span></span>');
     * // Returns '<div><span></span></div>'
     *
     * div = innerHTML(div, '<script>console.log("log something");</script>');
     * // Returns '<div><script>console.log("log something");</script></div>'
     * // Executing the script tag once attached to the document body
     * ```
     */
    function innerHTML (node, html) {
        if (!validateHtml(html)) {
            throw Error('HTML is not valid: ' + html);
        }

        node.innerHTML = html;

        // Replace all script tags with created elements
        getElementByTag(node, 'script', recreateNode);

        return node;
    }

    return innerHTML;

});
