define([
], function () {
    /**
     * Removes an elements child node and optionally the node itself.
     *
     * @exports remove-element
     *
     * @param {Object} node HTML node to act upon
     * @param {Boolean} self Optional: Remove the entire node
     *
     * return {Object} Original HTML node
     *
     * @example
     * ```html
     * <body>
     * <div class="my-parent">
     * 		<div>
     * 			<span></span>
     * 	 	</div>
     * 		<img />
     *  </div>
     * </body>
     * ```
     * ```js
     * removeElement(myParent);
     * // Returns <body> (containing <div class="my-parent"></div>)
     * ```
     * ```js
     * removeElement(myParent, true)
     * // Returns <body></body (no longer containing <div class="my-parent"></div>)
     * ```
     */
    function removeElement (node, self) {
        var parent = node.parentNode;
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        if (self && parent) {
            parent.removeChild(node);
        }
        return parent;
    }

    return removeElement;
});
