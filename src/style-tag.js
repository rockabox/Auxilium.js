define([
], function () {
    /**
     * A module helper to create, attach and get the contents of a style tag
     * @exports style-tag
     */
    function styleTag () {
        return {
            /**
             * Attaches a css to a specific document
             *
             * @param {String} css The css text in which to attach to the Style tag
             * @param {Object} doc The specific document to attach the Style tag (Optional)
             *
             * @return {Object} The style tag with the css attached (and attached to the document)
             *
             * @example
             * ```js
             * var css = 'body { margin: 0 auto; };',
             *  styleAttached = styleTag.attach(css, document);
             * // Returns a style tag with it attached to the document body
             * ```
             */
            attach: function (css, doc) {
                var node;
                doc = doc || document;

                node = this.generate(css, doc);
                doc.body.appendChild(node);

                return node;
            },
            /**
             * Retrieves the contents of a given style tag
             *
             * @param {Object} node The style HTMLNode in which to get the contents
             *
             * @return {Object} The text within the style tag (the CSS).
             *
             * ```js
             * style = '<style>body { margin: 0; }',
             * styleContents = styleTag.contents(style);
             * // Returns 'body { margin: 0; }'
             * ```
             */
            contents: function (node) {
                if (node.styleSheet) {
                    return node.styleSheet.cssText;
                }
                return node.innerHTML;
            },
            /**
             * Creates a Style tag and attaches css
             *
             * @param {String} css The css text in which to attach to the Style tag
             * @param {Object} doc The specific document to use in order to create the Style tag
             *
             * @return {Object} The style tag with the css attached
             *
             * @example
             * ```js
             * var css = 'body { margin: 0 auto; };',
             *  styleAttached = styleTag.attach(css, document);
             * // Returns a style tag with css contents attached
             * ```
             */
            generate: function (css, doc) {
                var style = doc.createElement('style');

                style.type = 'text/css';

                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    var textNode = doc.createTextNode(css);
                    style.appendChild(textNode);
                }

                return style;
            }
        };
    }

    return styleTag();
});
