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
             * @param {Object} params The paramaters for the style tag
             * @property {String} params.css The css text in which to attach to the Style tag
             * @property {Object} params.doc The specific document to attach the Style tag (Optional)
             * @property {String} params.id A specific unique identifier of the style tag
             *
             *
             * @return {Object} The style tag with the css attached (and attached to the document)
             *
             * @example
             * ```js
             * var css = 'body { margin: 0 auto; };',
             *  styleAttached = styleTag.attach({
             *    css: css,
             *    document: document,
             *    id: 'fred-flinston'
             *  });
             * // Returns a style tag with it attached to the document body
             * styleAttached = styleTag.attach({
             *    css: css,
             *    document: document,
             *    id: 'fred-flinston'
             *  });
             * // Running a second time will return the first instance of the style tag
             * ```
             */
            attach: function (params) {
                var node;
                doc = params.document || document;

                node = this.generate(params);
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
             * Creates a Style tag and attaches the css, checking if the script tag with the specific ID exists already.
             *
             * @param {Object} params The paramaters for the style tag
             * @property {String} params.css The css text in which to attach to the Style tag
             * @property {Object} params.doc The specific document to attach the Style tag (Optional)
             * @property {String} params.id A specific unique identifier of the style tag
             *
             * @return {Object} The style tag with the css attached
             *
             * @example
             * ```js
             * var css = 'body { margin: 0 auto; };',
             *  styleAttached = styleTag.generate({
             *    css: css,
             *    document: document,
             *    id: 'fred-flinston'
             *  });
             * // Returns a style tag with css contents attached
             * ```
             */
            generate: function (params) {
                var css = params.css,
                    doc = params.document || document,
                    style = (params.id) ? doc.getElementById(params.id) : null;

                if (!style) {
                    style = doc.createElement('style');
                    style.type = 'text/css';
                    style.id = params.id;

                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        var textNode = doc.createTextNode(css);
                        style.appendChild(textNode);
                    }
                }

                return style;
            }
        };
    }

    return styleTag();
});
